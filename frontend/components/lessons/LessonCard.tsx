// app/tools/Lessons/components/LessonCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // or your toast library

interface LessonCardProps {
  id: string;
  title: string;
  image: string;
  segments: string[];
  author: string;
  authorInitials: string;
  updatedDate: string;
  onDelete?: () => void; // Callback to refresh the list after deletion
}

const LessonCard = ({
  id,
  title,
  image,
  segments,
  author,
  authorInitials,
  updatedDate,
  onDelete,
}: LessonCardProps) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Map segment types to display labels
  const segmentLabels: Record<string, string> = {
    presentation: "Presentation",
    assessment: "Assessment",
    game: "Game",
    homework: "Homework",
    "quiet-time": "Quiet Time",
  };

  // Get unique segment types
  const uniqueSegments = Array.from(new Set(segments));

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/lessons/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }

      toast.success("Lesson deleted successfully");
      setShowDeleteDialog(false);
      
      // Call the onDelete callback to refresh the list
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
        onClick={() => router.push(`/tools/Lessons/editor?id=${id}`)}
      >
        <div className="aspect-[3/2] overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base mb-2 line-clamp-2">{title}</h3>
            <div className="flex gap-1.5 flex-wrap">
              {uniqueSegments.map((segment, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="font-normal text-xs"
                >
                  {segmentLabels[segment] || segment}
                </Badge>
              ))}
              {uniqueSegments.length === 0 && (
                <Badge 
                  variant="outline" 
                  className="font-normal text-xs text-muted-foreground"
                >
                  No segments yet
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {authorInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs truncate">{author}</p>
              <p className="text-xs text-muted-foreground">Updated {updatedDate}</p>
            </div>
          </div>
        </div>

        {/* Three-dot menu in bottom right */}
        <div className="absolute bottom-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="p-1 rounded-md hover:bg-accent transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent card navigation
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card navigation
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Lesson
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{title}"? This action cannot be undone.
              All segments and associated data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LessonCard;