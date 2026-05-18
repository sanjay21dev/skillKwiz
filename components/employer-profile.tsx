"use client";

import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import Image from "next/image";

interface EmployerProfileProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function EmployerProfile({ data, onUpdate }: EmployerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(data);

  // Keep local state in sync when data changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!formData) return null;

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/10 rounded-lg p-6">
        <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-b from-gray-300 to-gray-400 flex-shrink-0">
          <Image
            src="/images/profile-pic.png"
            alt="Profile"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            {isEditing ? (
              <input
                value={`${formData.firstName} ${formData.lastName}`}
                onChange={(e) => {
                  const [firstName, ...rest] = e.target.value.split(" ");
                  setFormData({
                    ...formData,
                    firstName,
                    lastName: rest.join(" "),
                  });
                }}
                className="bg-transparent border-b border-white text-4xl font-bold mb-2 focus:outline-none"
              />
            ) : (
              <h1 className="text-4xl font-bold mb-2">
                {formData.firstName} {formData.lastName}
              </h1>
            )}

            <button
              className="text-white hover:text-blue-200"
              onClick={() => {
                if (isEditing) {
                  onUpdate(formData);
                }
                setIsEditing(!isEditing);
              }}
            >
              <Edit className="w-6 h-6" />
            </button>
          </div>

          {isEditing ? (
            <input
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="bg-transparent border-b border-white text-2xl mb-4 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl mb-4">{formData.company}</h2>
          )}

          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-medium">Department : </span>
              {isEditing ? (
                <input
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="bg-transparent border-b border-white focus:outline-none"
                />
              ) : (
                formData.department
              )}
            </p>

            <p className="text-lg">
              <span className="font-medium">Contact No : </span>
              {isEditing ? (
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-transparent border-b border-white focus:outline-none"
                />
              ) : (
                formData.phone
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}