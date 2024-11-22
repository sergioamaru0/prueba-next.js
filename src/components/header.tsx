"use client"

import { useState } from "react"
import Link from "next/link"
import { UserCircle } from 'lucide-react'
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-amber-500">
            QUICKBET MOVIES
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/popular" className="hover:text-amber-500 transition-colors">
              Popular
            </Link>
            <Link href="/favorites" className="hover:text-amber-500 transition-colors">
              Favorites
            </Link>
          </nav>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">{user.email}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="hover:bg-gray-800 rounded-full transition-colors"
            >
              <UserCircle className="w-6 h-6 text-amber-500" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAuthModal(true)}
            className="hover:bg-gray-800 rounded-full transition-colors"
          >
            <UserCircle className="w-6 h-6" />
            <span className="sr-only">Sign in</span>
          </Button>
        )}
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

