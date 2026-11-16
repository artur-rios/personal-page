import { describe, expect, it } from 'vitest';
import {
  dotnetLibraries,
  getGroupProjects,
  getGroupTech,
  getProjectGroup,
  getTechFilter,
  matchesTechFilter,
  projectGroups,
  projects,
  techFilters,
} from './projects';
import type { ProjectGroup } from '@/types/project-group';

const allProjects = [...projects, ...dotnetLibraries];

function groupOf(repoNames: string[]): ProjectGroup {
  return { slug: 'test', title: 'Test', overview: 'Test', projectRepoNames: repoNames };
}

describe('the project catalogue', () => {
  it('given every group, when its repositories are resolved, then each names a listed project', () => {
    for (const group of projectGroups) {
      expect(
        getGroupProjects(group).map((p) => p.repoName),
        group.slug,
      ).toEqual(group.projectRepoNames);
    }
  });

  it('given every project, when its links are read, then the GitHub URL matches its owner and repository', () => {
    for (const project of allProjects) {
      expect(project.githubUrl, project.repoName).toBe(
        `https://github.com/${project.repoOwner}/${project.repoName}`,
      );
    }
  });

  it('given every project, when compared, then no repository is listed twice', () => {
    const names = allProjects.map((p) => p.repoName);
    expect(new Set(names).size).toBe(names.length);
  });

  it('given every group, when compared, then each slug is unique and fit for a URL', () => {
    const slugs = projectGroups.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('given every project, when its texts are read, then each has a description and at least one technology', () => {
    for (const project of allProjects) {
      expect(project.description.trim(), project.repoName).not.toBe('');
      expect(project.tech.length, project.repoName).toBeGreaterThan(0);
    }
  });

  it('given the .NET libraries group, when resolved, then it lists every .NET library', () => {
    const group = getProjectGroup('dotnet-libraries');
    expect(group && getGroupProjects(group)).toEqual(dotnetLibraries);
  });
});

describe('getProjectGroup', () => {
  it('given a known slug, when looked up, then its group is returned', () => {
    expect(getProjectGroup('heimdall')?.title).toBe('Heimdall');
  });

  it('given an unknown slug, when looked up, then there is no group', () => {
    expect(getProjectGroup('no-such-group')).toBeUndefined();
  });
});

describe('getGroupProjects', () => {
  it('given repository names, when resolved, then the projects come back in the group order', () => {
    const [first, second] = allProjects;
    expect(getGroupProjects(groupOf([second.repoName, first.repoName]))).toEqual([
      second,
      first,
    ]);
  });

  it('given a repository that is not listed, when resolved, then it is left out', () => {
    const [first] = allProjects;
    expect(getGroupProjects(groupOf(['not-a-repository', first.repoName]))).toEqual([
      first,
    ]);
  });
});

describe('getGroupTech', () => {
  it('given projects sharing technologies, when collected, then each appears once in first-seen order', () => {
    const tech = getGroupTech(groupOf(allProjects.map((p) => p.repoName)));
    expect(new Set(tech).size).toBe(tech.length);
    expect(tech[0]).toBe(allProjects[0].tech[0]);
  });

  it('given a group with no listed project, when collected, then there is no technology', () => {
    expect(getGroupTech(groupOf(['not-a-repository']))).toEqual([]);
  });
});

describe('tech filters', () => {
  it('given each filter, when the catalogue is narrowed by it, then at least one group matches', () => {
    for (const filter of techFilters) {
      expect(
        projectGroups.some((group) => matchesTechFilter(group, filter)),
        filter.slug,
      ).toBe(true);
    }
  });

  it('given a known slug, when looked up, then its filter is returned', () => {
    expect(getTechFilter('flutter-dart')?.tech).toEqual(['Flutter', 'Dart']);
  });

  it.each([null, '', 'cobol'])(
    'given the slug %s, when looked up, then there is no filter',
    (slug) => {
      expect(getTechFilter(slug)).toBeUndefined();
    },
  );

  it('given a filter with several technologies, when matched, then any one of them is enough', () => {
    const filter = getTechFilter('flutter-dart')!;
    const dartOnly = allProjects.find(
      (p) => p.tech.includes('Dart') || p.tech.includes('Flutter'),
    )!;
    expect(matchesTechFilter(groupOf([dartOnly.repoName]), filter)).toBe(true);
  });

  it('given a group without the technology, when matched, then it does not match', () => {
    const python = allProjects.find((p) => p.tech.every((t) => t !== 'Rust'))!;
    expect(matchesTechFilter(groupOf([python.repoName]), getTechFilter('rust')!)).toBe(
      false,
    );
  });

  it('given every filter, when compared, then each slug is unique', () => {
    const slugs = techFilters.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
