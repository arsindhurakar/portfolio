import { IProject } from "interfaces/projects";
import { useEffect, useState } from "react";
import projectsData from "../../data/projects.json";
import { AnimatePresence, motion } from "framer-motion";
import { DescriptionModal, StackedCarousel } from "components/shared/molecules";

export function Projects() {
  const { projects: initialProjects } = projectsData;
  const selectedProjectIndex = initialProjects.length - 1;
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);

  // Update selected project
  const onCarouselSelected = (project: IProject) => {
    setSelectedProject(project);
  };

  // Detect if content overflows immediately after element is rendered
  useEffect(() => {
    if (!contentEl) return;

    const checkOverflow = () => {
      const isNowOverflowing = contentEl.scrollHeight > contentEl.clientHeight;
      setIsOverflowing(isNowOverflowing);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [contentEl, selectedProject]);

  // Initialize projects and generate thumbnail URLs
  useEffect(() => {
    const projectsWithScreenshots = initialProjects.map((project) => {
      const descriptionArray =
        typeof project.description === "string"
          ? [project.description]
          : project.description;

      const thumUrl = project.backgroundUrl
        ? // ? `https://image.thum.io/get/width/1200/crop/1020/${project.backgroundUrl}`
          `https://s3.amazonaws.com/screenshotapi.com/cmi3afhmi0000s6014evyd6va/httpskathmandustudiovercelapp.jpeg`
        : "";

      return {
        ...project,
        description: descriptionArray,
        backgroundUrl: thumUrl,
      };
    });

    setProjects(projectsWithScreenshots);
    setSelectedProject(projectsWithScreenshots[selectedProjectIndex]);
  }, [initialProjects, selectedProjectIndex]);

  return (
    <>
      <div className="h-screen w-full px-4 py-6 md:p-8  flex items-start md:items-center bg-background-primary">
        <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-col sm:flex-row gap-10 sm:gap-8">
          {/* Project title and description */}
          <div className="relative flex flex-col sm:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject?.id}
                className="w-full sm:absolute sm:top-0 sm:left-0"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                <div className="space-y-4">
                  <h1 className="text-primary m-0">{selectedProject?.title}</h1>
                  <div
                    ref={setContentEl} // callback ref ensures measurement immediately
                    className={`relative overflow-hidden h-[40vh] sm:h-full ${
                      isOverflowing
                        ? "cursor-pointer sm:pointer-events-none"
                        : "cursor-default"
                    }`}
                    onClick={() => {
                      if (isOverflowing) setIsModalOpen(true);
                    }}
                  >
                    <p>
                      {selectedProject?.description?.map((item, index) =>
                        typeof item === "string" ? (
                          item
                        ) : (
                          <span key={index} className={item.className}>
                            {item.text}
                          </span>
                        )
                      )}
                    </p>
                    {isOverflowing && (
                      <div className="sm:hidden absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background-primary to-transparent" />
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel */}
          <div className="flex flex-col items-center sm:w-1/2">
            <StackedCarousel
              cards={projects}
              selectedCardIndex={selectedProjectIndex}
              handleCarouselSelected={onCarouselSelected}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject?.title}
        content={selectedProject?.description || []}
      />
    </>
  );
}

export default Projects;
