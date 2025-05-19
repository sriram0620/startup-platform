"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, Calendar, ExternalLink, Plus } from "lucide-react"

interface ProfileAchievementsProps {
  isLoading: boolean
  achievements: any[]
}

export default function ProfileAchievements({ isLoading, achievements }: ProfileAchievementsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Achievements & Certifications</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : achievements.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No achievements yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Add your achievements, certifications, and awards to showcase your expertise.
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Achievement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <Badge variant="outline" className="bg-primary/5">
                          {achievement.year}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.issuer}</p>

                      {achievement.description && <p className="text-sm mt-2">{achievement.description}</p>}

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        {achievement.date && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{achievement.date}</span>
                          </div>
                        )}

                        {achievement.url && (
                          <Button variant="link" size="sm" className="h-auto p-0 gap-1">
                            <ExternalLink className="h-4 w-4" />
                            View Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

