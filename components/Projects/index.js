import Styles from "@styles/Projects.module.css";
import Image from "next/image";

export default function Projects({ projects }) {
  return (
    <ol className={Styles.projects}>
      {projects.map((project) => (
        <li className={Styles.projects__project}>
          <Image
            src={project.image.url}
            height={project.image.height}
            width={project.image.width}
            alt={project.image.description}
            layout="responsive"
          />
          <div className={Styles.projects__detailsContainer}>
            <h2 className={Styles.projects__projectTitle}>{project.name}</h2>
            <p className={Styles.projects__projectDescription}>
              {project.description}
            </p>
            <a
              href={project.link}
              className={Styles.projects__projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkText} →
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}
