//frontend/lib/firebase/storage.ts//frontend/lib/firebase/storage.ts
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  UploadMetadata,
  StorageReference,
} from 'firebase/storage'
import { storage } from './config'

// Upload a file to Firebase Storage
export const uploadFile = async (
  file: File,
  path: string,
  metadata?: UploadMetadata
) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file, metadata)
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return {
      downloadURL,
      fullPath: snapshot.ref.fullPath,
      error: null,
    }
  } catch (error: any) {
    return {
      downloadURL: null,
      fullPath: null,
      error: error.message,
    }
  }
}

// Upload file with progress tracking
export const uploadFileWithProgress = (
  file: File,
  path: string,
  onProgress?: (progress: number) => void,
  metadata?: UploadMetadata
) => {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  return new Promise<{
    downloadURL: string | null
    fullPath: string | null
    error: string | null
  }>((resolve) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculate and report progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
      },
      (error) => {
        // Handle errors
        resolve({
          downloadURL: null,
          fullPath: null,
          error: error.message,
        })
      },
      async () => {
        // Handle successful upload
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve({
            downloadURL,
            fullPath: uploadTask.snapshot.ref.fullPath,
            error: null,
          })
        } catch (error: any) {
          resolve({
            downloadURL: null,
            fullPath: null,
            error: error.message,
          })
        }
      }
    )
  })
}

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  basePath: string,
  onProgress?: (fileIndex: number, progress: number) => void
) => {
  try {
    const uploads = files.map((file, index) => {
      const filePath = `${basePath}/${file.name}`
      return uploadFileWithProgress(
        file,
        filePath,
        onProgress ? (progress) => onProgress(index, progress) : undefined
      )
    })

    const results = await Promise.all(uploads)
    return { results, error: null }
  } catch (error: any) {
    return { results: null, error: error.message }
  }
}

// Get download URL for a file
export const getFileURL = async (path: string) => {
  try {
    const storageRef = ref(storage, path)
    const downloadURL = await getDownloadURL(storageRef)
    return { downloadURL, error: null }
  } catch (error: any) {
    return { downloadURL: null, error: error.message }
  }
}

// Delete a file
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Delete multiple files
export const deleteMultipleFiles = async (paths: string[]) => {
  try {
    const deletions = paths.map((path) => {
      const storageRef = ref(storage, path)
      return deleteObject(storageRef)
    })

    await Promise.all(deletions)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// List all files in a directory
export const listFiles = async (path: string) => {
  try {
    const storageRef = ref(storage, path)
    const result = await listAll(storageRef)
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        const metadata = await getMetadata(itemRef)
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url,
          size: metadata.size,
          contentType: metadata.contentType,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
        }
      })
    )

    const folders = result.prefixes.map((folderRef) => ({
      name: folderRef.name,
      fullPath: folderRef.fullPath,
    }))

    return { files, folders, error: null }
  } catch (error: any) {
    return { files: null, folders: null, error: error.message }
  }
}

// Get file metadata
export const getFileMetadata = async (path: string) => {
  try {
    const storageRef = ref(storage, path)
    const metadata = await getMetadata(storageRef)
    return { metadata, error: null }
  } catch (error: any) {
    return { metadata: null, error: error.message }
  }
}

// Update file metadata
export const updateFileMetadata = async (
  path: string,
  newMetadata: UploadMetadata
) => {
  try {
    const storageRef = ref(storage, path)
    const metadata = await updateMetadata(storageRef, newMetadata)
    return { metadata, error: null }
  } catch (error: any) {
    return { metadata: null, error: error.message }
  }
}

// Helper function to generate a unique file path
export const generateUniqueFilePath = (
  userId: string,
  fileName: string,
  folder: string = 'uploads'
) => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const fileExtension = fileName.split('.').pop()
  const fileNameWithoutExt = fileName.replace(`.${fileExtension}`, '')
  
  return `${folder}/${userId}/${fileNameWithoutExt}_${timestamp}_${randomString}.${fileExtension}`
}

// Helper function to validate file type
export const validateFileType = (file: File, allowedTypes: string[]) => {
  return allowedTypes.some((type) => {
    if (type.endsWith('/*')) {
      // Handle wildcards like 'image/*'
      const category = type.split('/')[0]
      return file.type.startsWith(category)
    }
    return file.type === type
  })
}

// Helper function to validate file size
export const validateFileSize = (file: File, maxSizeInMB: number) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}