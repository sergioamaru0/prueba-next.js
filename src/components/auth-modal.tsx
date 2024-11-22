"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import image1 from '@/assets/image-pose1.png'
import image2 from '@/assets/image-pose2.png'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
      onClose()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden bg-slate-300/10 backdrop-blur-xl border-none">
        <VisuallyHidden>
          <DialogTitle>{isLogin ? "Log in" : "Sign up"} to QuickBet Movies</DialogTitle>
        </VisuallyHidden>
        <div className="relative min-h-[600px]">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 flex items-center text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <div className="grid md:grid-cols-2 h-full border-gray-50/10 border rounded-lg">
            <div className="p-12 pt-24">
              <div className="top-0 left-0 right-0 flex justify-center items-center h-16">
                <div className="flex">
                  <Button
                    variant={!isLogin ? "default" : "ghost"}
                    className={!isLogin ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-gray-800/50"}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </Button>
                  <Button
                    variant={isLogin ? "default" : "ghost"}
                    className={isLogin ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-gray-800/50"}
                    onClick={() => setIsLogin(true)}
                  >
                    Log in
                  </Button>
                </div>
              </div>

              <div className="max-w-sm mx-auto space-y-6">
                <div className="text-center mb-8">
                  <p className="text-white/60">
                    {isLogin ? "We love having you back" : "Ready to start your journey?"}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white border-white/10 text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-white border-white/10 text-gray-400 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Continue
                  </Button>
                </form>

                <div className="text-center text-sm text-white/60">
                  For any questions, reach out to support@quickbetmovies.com
                </div>
              </div>
            </div>

            <div className="hidden md:block bg-[#111114] p-12 pt-24 m-2 rounded-r-lg">
              <div className="max-w-sm mx-auto text-center space-y-4">
                <h2 className="text-2xl font-bold text-white text-balance">
                  Welcome {isLogin ? "back to" : "to"} Quickbet Movies!
                </h2>
                
                <p className="text-white/60">
                  {isLogin 
                    ? "🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"
                    : "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"
                  }
                </p>
                <div>
                  <Image
                    src={isLogin?image2:image1}
                    alt="3D character illustration"
                    className="w-100 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

