/**
 * Navari AI ? Knowledge Retrieval Service
 * Queries the local structured knowledge base and returns matching records.
 */
window.NavariAI_Retrieval = (() => {
  const getData = () => window.NavariAIData || {};

  const getProfile = () => getData().profile || {};
  const getSkills = () => getData().skills || { categories: [] };
  const getExperience = () => getData().experience || [];
  const getProjects = () => getData().projects || [];
  const getResearch = () => getData().research || {};
  const getCertifications = () => getData().certifications || { hackathons: [], coursesAndBadges: [] };
  const getContact = () => getData().contact || {};

  const getProjectById = (projectId) => {
    const list = getProjects();
    return list.find(p => p.id === projectId) || null;
  };

  const getProjectsByDomain = (domain) => {
    const list = getProjects();
    const dLower = (domain || '').toLowerCase();
    return list.filter(p => 
      (p.category && p.category.toLowerCase().includes(dLower)) ||
      (p.domain && p.domain.toLowerCase().includes(dLower)) ||
      (p.technologies && p.technologies.some(t => t.toLowerCase().includes(dLower)))
    );
  };

  const getSkillsByCategory = (categoryKey) => {
    const skillsObj = getSkills();
    const cat = skillsObj.categories.find(c => c.key === categoryKey);
    return cat ? cat.skills : [];
  };

  const searchKnowledge = (term) => {
    const t = (term || '').toLowerCase();
    const results = {
      projects: [],
      skills: [],
      experience: []
    };

    getProjects().forEach(p => {
      if (
        p.title.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t) ||
        p.technologies.some(tech => tech.toLowerCase().includes(t))
      ) {
        results.projects.push(p);
      }
    });

    getSkills().categories.forEach(cat => {
      cat.skills.forEach(s => {
        if (s.toLowerCase().includes(t)) {
          results.skills.push({ skill: s, category: cat.name });
        }
      });
    });

    getExperience().forEach(exp => {
      if (
        exp.role.toLowerCase().includes(t) ||
        exp.organization.toLowerCase().includes(t) ||
        exp.description.toLowerCase().includes(t) ||
        (exp.technologies && exp.technologies.some(tech => tech.toLowerCase().includes(t)))
      ) {
        results.experience.push(exp);
      }
    });

    return results;
  };

  return {
    getProfile,
    getSkills,
    getExperience,
    getProjects,
    getResearch,
    getCertifications,
    getContact,
    getProjectById,
    getProjectsByDomain,
    getSkillsByCategory,
    searchKnowledge
  };
})();
