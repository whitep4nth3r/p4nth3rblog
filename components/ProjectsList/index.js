import Styles from "@styles/ProjectsList.module.css";
import Image from "next/image";
import Star from "./svg/Star";
import Fork from "./svg/Fork";
import Octocat from "./svg/Octocat";

export default function ProjectsList({ projects }) {
  return (
    <ol className={Styles.projects}>
      {projects.map((project) => (
        <li className={Styles.projects__project} key={project.sys.id}>
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
            <a
              href={`https://github.com/whitep4nth3r/${project.gitHubRepoName}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.gitHubRepoName} repository on GitHub`}
              className={Styles.projects__gitHubDetailsLink}
            >
              <div
                className={Styles.projects__gitHubDetailsInner}
                aria-label={`${project.gitHubRepoName} repository has ${project.gitHubStats.stargazerCount} stars on GitHub`}
              >
                <span className={Styles.projects__gitHubStatIconContainer}>
                  <Star />
                </span>
                {project.gitHubStats.stargazerCount}
              </div>
              <div
                className={Styles.projects__gitHubDetailsInner}
                aria-label={`${project.gitHubRepoName} repository has been forked ${project.gitHubStats.forkCount} times on GitHub`}
              >
                <span className={Styles.projects__gitHubStatIconContainer}>
                  <Fork />
                </span>
                {project.gitHubStats.forkCount}
              </div>
              <div
                className={`${Styles.projects__gitHubDetailsInner} ${Styles.projects__gitHubDetailsInner__cta}`}
              >
                <span className={Styles.projects__gitHubStatIconContainer}>
                  <Octocat />
                </span>{" "}
                View source
              </div>
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}
