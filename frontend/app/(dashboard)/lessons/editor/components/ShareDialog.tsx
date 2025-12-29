//frontend/app/(dashboard)/lessons/editor/components/ShareDialog.tsx

"use client";

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Globe, Link, Play, Copy, Code, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AccessLevel = 'anyone' | 'specific';
type Permission = 'view' | 'edit';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange }) => {
  const [view, setView] = useState<'main' | 'settings'>('main');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('anyone');
  const [permission, setPermission] = useState<Permission>('view');
  const [emailInput, setEmailInput] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleCopyPresentationLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Presentation link copied to clipboard');
  };

  const handleGetEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.href}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast.success('Embed code copied to clipboard');
  };

  const handleInvite = () => {
    if (emailInput.trim()) {
      toast.success(`Invitation sent to ${emailInput}`);
      setEmailInput('');
    }
  };

  const handleSaveSettings = () => {
    toast.success('Share settings saved');
    setView('main');
  };

  const handleClose = () => {
    setView('main');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[460px] p-0 gap-0 bg-popover border-border overflow-hidden">
        {view === 'main' ? (
          <>
            {/* Main Share View */}
            <DialogHeader className="p-4 pb-0 pr-12">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-base font-medium text-foreground">
                  Share these slides
                </DialogTitle>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Link className="h-4 w-4" />
                  Copy link
                </button>
              </div>
            </DialogHeader>

            <div className="p-4 space-y-4">
              {/* Info Banner */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground flex-1">
                  To invite people to edit, move this draft into your projects.
                </p>
                <button className="text-sm text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                  Move file
                </button>
              </div>

              {/* Email Input */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Add comma separated emails to invite"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleInvite}
                  className="px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                >
                  Invite
                </button>
              </div>

              {/* Who has access */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Who has access</h4>
                
                {/* Anyone row */}
                <button
                  onClick={() => setView('settings')}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-foreground">Anyone</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>can {permission}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </button>

                {/* Owner row */}
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                      M
                    </div>
                    <span className="text-sm text-foreground">matthew (you)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">owner</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-border pt-4 space-y-1">
                <button
                  onClick={handleCopyPresentationLink}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Copy presentation link</span>
                </button>
                <button
                  onClick={handleGetEmbedCode}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Get embed code</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Share Settings View */}
            <DialogHeader className="p-4 pb-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('main')}
                  className="p-1.5 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <DialogTitle className="text-base font-medium text-foreground">
                  Share settings
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="p-4 space-y-6">
              {/* Who can access */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Who can access</h4>
                <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-muted border border-border hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {accessLevel === 'anyone' ? 'Anyone' : 'Specific people'}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
                </button>
                <p className="text-sm text-muted-foreground">
                  Anyone, even outside your organization, will be able to access this file.
                </p>
              </div>

              {/* What can they do */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">What can they do</h4>
                
                <div className="space-y-2">
                  <label
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      permission === 'view' 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <input
                      type="radio"
                      name="permission"
                      checked={permission === 'view'}
                      onChange={() => setPermission('view')}
                      className="mt-0.5 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground">View</span>
                      {permission === 'view' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Can view and comment on this file.
                        </p>
                      )}
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      permission === 'edit' 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <input
                      type="radio"
                      name="permission"
                      checked={permission === 'edit'}
                      onChange={() => setPermission('edit')}
                      className="mt-0.5 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground">Edit</span>
                      {permission === 'edit' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Can edit, comment, and modify this file.
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setView('main')}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
