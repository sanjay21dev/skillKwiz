"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  MapPin,
} from "lucide-react";

export default function EmployerCandidateList() {

  const [
    candidates,
    setCandidates,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    locationText,
    setLocationText,
  ] = useState("");

  // LOAD CANDIDATES
  useEffect(() => {

    const loadCandidates =
      async () => {

        try {

          const response =
            await fetch(
              "/api/employer/candidates"
            );

          const data =
            await response.json();

          if (data.success) {

            const formatted =
              data.candidates.map(
                (
                  candidate: any,
                  index: number
                ) => ({

                  id:
                    candidate.id,

                  name:
                    candidate.employeeName,

                  initial:
                    candidate.employeeName?.charAt(
                      0
                    ),

                  company:
                    candidate.company,

                  skills:
                    candidate.selectedSkills
                      ? candidate.selectedSkills.split(
                          ","
                        )
                      : ["Assessment"],

                  percentile:
                    candidate.score || 0,

                  location:
                    candidate.testingCenter ||
                    "India",

                  color: [
                    "bg-green-600",
                    "bg-yellow-600",
                    "bg-blue-700",
                    "bg-pink-600",
                    "bg-purple-600",
                    "bg-indigo-600",
                  ][
                    index % 6
                  ],

                  reportUrl:
                    candidate.reportUrl,

                  score:
                    candidate.score,
                })
              );

            setCandidates(
              formatted
            );
          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    loadCandidates();

  }, []);

  // FILTER
  const filteredCandidates =
    candidates.filter(
      (candidate) => {

        const searchMatch =
          searchText ===
            "" ||
          candidate.name
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            ) ||
          candidate.skills
            .join(" ")
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            );

        const locationMatch =
          locationText ===
            "" ||
          candidate.location
            .toLowerCase()
            .includes(
              locationText.toLowerCase()
            );

        return (
          searchMatch &&
          locationMatch
        );
      }
    );

  // VIEW REPORT
  const viewReport =
    (candidate: any) => {

      alert(`
Candidate:
${candidate.name}

Company:
${candidate.company}

Skills:
${candidate.skills.join(", ")}

Score:
${candidate.score}%

Location:
${candidate.location}
      `);
    };

  return (

    <div className="text-white">

      {/* SEARCH BAR */}
      <div className="bg-[#1a2b4a] rounded-full overflow-hidden mb-6">

        <div className="grid grid-cols-4">

          <div className="flex items-center px-4 py-3 border-r border-gray-600">

            <Search className="w-5 h-5 mr-2 text-gray-400" />

            <input
              type="text"
              placeholder="Candidate Name / Skill"
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              className="bg-transparent w-full focus:outline-none text-white"
            />

          </div>

          <div className="flex items-center px-4 py-3 border-r border-gray-600">

            <MapPin className="w-5 h-5 mr-2 text-gray-400" />

            <input
              type="text"
              placeholder="Location"
              value={locationText}
              onChange={(e) =>
                setLocationText(
                  e.target.value
                )
              }
              className="bg-transparent w-full focus:outline-none text-white"
            />

          </div>

          <div className="flex items-center justify-center text-gray-300">
            Candidate Database
          </div>

          <div className="flex items-center justify-center px-4 py-3">

            <button
              onClick={() => {

                setSearchText("");
                setLocationText("");
              }}
              className="text-sm hover:text-gray-300"
            >
              Clear All
            </button>

          </div>

        </div>

      </div>

      {/* CANDIDATE LIST */}
      <section className="space-y-4">

        {loading ? (

          <p>
            Loading...
          </p>

        ) : filteredCandidates.length ===
          0 ? (

          <p className="text-center text-gray-300">
            No candidates found
          </p>

        ) : (

          filteredCandidates.map(
            (candidate) => (

              <div
                key={
                  candidate.id
                }
                className="bg-[#4a63b3]/80 rounded-lg p-4 flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-full ${candidate.color} flex items-center justify-center text-xl font-bold`}
                  >
                    {
                      candidate.initial
                    }
                  </div>

                  <div>

                    <h3 className="text-lg font-medium">
                      {
                        candidate.name
                      }
                    </h3>

                    <p className="text-sm text-gray-300">

                      {
                        candidate.skills.join(
                          ", "
                        )
                      }

                      {" · "}

                      {
                        candidate.location
                      }

                    </p>

                    <p className="text-sm">

                      Percentile:
                      {" "}
                      {
                        candidate.percentile
                      }%

                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    viewReport(
                      candidate
                    )
                  }
                  className="bg-[#00bcd4] px-4 py-2 rounded hover:bg-[#00a5bb]"
                >
                  View Report
                </button>

              </div>
            )
          )
        )}

      </section>

    </div>
  );
}