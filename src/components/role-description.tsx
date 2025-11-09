"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface RoleDescriptionProps {
  role: string;
  years: string;
  description: string;
  responsibilities: string[];
}

export function RoleDescription({
  role,
  years,
  description,
  responsibilities,
}: RoleDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold">{role}</h3>
              <p className="text-muted-foreground">{years}</p>
            </div>
          </div>
          <p className="mb-4">{description}</p>
          <div>
            <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
