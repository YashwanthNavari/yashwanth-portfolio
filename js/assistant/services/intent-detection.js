/**
 * Navari AI ? Intent Detection Service
 * Analyzes natural language queries and extracts intents & entities.
 */
window.NavariAI_Intent = (() => {
  const normalize = (text) => {
    return (text || '')
      .toLowerCase()
      .trim()
      .replace(/[?!.,;:"'()\[\]{}]/g, ' ')
      .replace(/\s+/g, ' ');
  };

  const detect = (rawQuery) => {
    const q = normalize(rawQuery);
    const context = window.NavariAI_Context ? window.NavariAI_Context.getState() : {};

    // 1. Follow-up query detection using context
    const isPronounFollowUp = /\b(it|that project|this project|the system|the project)\b/.test(q);
    if (context.activeProject && (isPronounFollowUp || q.includes('how does it work') || q.includes('technologies does it use') || q.includes('tech stack does it use') || q.includes('show me the project') || q.includes('architecture') || q.includes('what problem'))) {
      if (q.includes('technolog') || q.includes('tech') || q.includes('stack') || q.includes('built with') || q.includes('languages')) {
        return { intent: 'PROJECT_TECH', project: context.activeProject };
      }
      if (q.includes('architecture') || q.includes('how does it work') || q.includes('workflow') || q.includes('pipeline')) {
        return { intent: 'PROJECT_ARCHITECTURE', project: context.activeProject };
      }
      if (q.includes('link') || q.includes('show') || q.includes('repo') || q.includes('github') || q.includes('source') || q.includes('demo')) {
        return { intent: 'PROJECT_LINK', project: context.activeProject };
      }
      return { intent: 'SPECIFIC_PROJECT', project: context.activeProject };
    }

    // 2. Complete Profile / "Tell me everything"
    if (
      q.includes('everything about') ||
      q.includes('complete overview') ||
      q.includes('tell me everything') ||
      q.includes('full background') ||
      q.includes('comprehensive overview') ||
      q.includes('all about yashwanth') ||
      q.includes('all about navari') ||
      (q.includes('overview') && (q.includes('background') || q.includes('profile') || q.includes('yashwanth')))
    ) {
      return { intent: 'PROFILE_COMPLETE' };
    }

    // 3. Recruiter Summary
    if (
      q.includes('recruiter') ||
      q.includes('hiring manager') ||
      q.includes('why should i hire') ||
      q.includes('why hire') ||
      q.includes('candidate summary') ||
      q.includes('quick summary')
    ) {
      return { intent: 'RECRUITER_SUMMARY' };
    }

    // 4. Greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|howdy|sup|yo)\b/.test(q)) {
      return { intent: 'GREETING' };
    }

    // 5. Short Bio / About
    if (
      q.includes('who is') ||
      q.includes('tell me about yashwanth') ||
      q.includes('tell me about navari') ||
      q.includes('who are you') ||
      q.includes('about yourself') ||
      q.includes('introduction') ||
      q.includes('intro') ||
      q === 'about' ||
      q === 'profile'
    ) {
      return { intent: 'PROFILE_SHORT' };
    }

    // 6. Education
    if (
      q.includes('education') ||
      q.includes('college') ||
      q.includes('university') ||
      q.includes('woxsen') ||
      q.includes('degree') ||
      q.includes('b.tech') ||
      q.includes('btech') ||
      q.includes('study') ||
      q.includes('academics')
    ) {
      return { intent: 'EDUCATION' };
    }

    // 7. Specific Projects Matching
    const projectKeywords = [
      { key: 'agrisathi', match: ['agrisathi', 'farmer', 'agriculture', 'crop recommendation'] },
      { key: 'age-gender-detection', match: ['age and gender', 'neurovision', 'age detection', 'gender detection', 'facial age'] },
      { key: 'ml-object-detection', match: ['object detection', 'yolo', 'surveillance tracking', 'object tracking'] },
      { key: 'smart-parking', match: ['smart parking', 'parking system', 'slot allocation', 'tkinter'] },
      { key: 'customer-churn', match: ['churn', 'customer churn', 'churn prediction', 'retention'] },
      { key: 'water-level-indicator', match: ['water level', 'tank level', 'water indicator', 'ultrasonic water'] },
      { key: 'library-management', match: ['library', 'library management', 'book management', 'normalized database'] },
      { key: 'campus-shuttle-routing', match: ['shuttle', 'campus shuttle', 'bus routing', 'transit routing'] },
      { key: 'fingerprint-voting', match: ['voting', 'fingerprint', 'biometric voting', 'electronic voting'] },
      { key: 'iot-waste-management', match: ['waste management', 'smart bin', 'garbage monitoring', 'trash station'] }
    ];

    for (const item of projectKeywords) {
      for (const phrase of item.match) {
        if (q.includes(phrase)) {
          if (q.includes('technolog') || q.includes('stack') || q.includes('languages')) {
            return { intent: 'PROJECT_TECH', project: item.key };
          }
          if (q.includes('architecture') || q.includes('workflow') || q.includes('how does it work')) {
            return { intent: 'PROJECT_ARCHITECTURE', project: item.key };
          }
          return { intent: 'SPECIFIC_PROJECT', project: item.key };
        }
      }
    }

    // 8. General Projects Queries
    if (
      q.includes('projects') ||
      q.includes('what has he built') ||
      q.includes('portfolio work') ||
      q.includes('show me projects') ||
      q.includes('project showcase') ||
      q.includes('applications')
    ) {
      if (q.includes('computer vision') || q.includes('cv')) {
        return { intent: 'DOMAIN_PROJECTS', domain: 'Computer Vision' };
      }
      if (q.includes('iot') || q.includes('hardware')) {
        return { intent: 'DOMAIN_PROJECTS', domain: 'IoT' };
      }
      if (q.includes('machine learning') || q.includes('ml')) {
        return { intent: 'DOMAIN_PROJECTS', domain: 'Machine Learning' };
      }
      return { intent: 'PROJECTS_ALL' };
    }

    // 9. Patent & Intellectual Property
    if (
      q.includes('patent') ||
      q.includes('intellectual property') ||
      q.includes('470097') ||
      q.includes('govt of india patent') ||
      q.includes('iot device patent') ||
      q.includes('design patent')
    ) {
      return { intent: 'PATENT' };
    }

    // 10. Computer Vision domain
    if (
      q.includes('computer vision') ||
      q.includes('opencv') ||
      q.includes('yolo') ||
      q.includes('face detection') ||
      q.includes('image processing')
    ) {
      return { intent: 'DOMAIN_CV' };
    }

    // 11. Generative AI & LLMs
    if (
      q.includes('generative ai') ||
      q.includes('gen ai') ||
      q.includes('genai') ||
      q.includes('llm') ||
      q.includes('large language model') ||
      q.includes('prompt engineering') ||
      q.includes('rag') ||
      q.includes('transformers')
    ) {
      return { intent: 'DOMAIN_GENAI' };
    }

    // 12. Machine Learning & Data Science domain
    if (
      q.includes('machine learning') ||
      q.includes('deep learning') ||
      q.includes('scikit') ||
      q.includes('pytorch') ||
      q.includes('tensorflow') ||
      q.includes('random forest') ||
      q.includes('cnn')
    ) {
      return { intent: 'DOMAIN_ML' };
    }

    if (
      q.includes('data science') ||
      q.includes('data analysis') ||
      q.includes('eda') ||
      q.includes('pandas') ||
      q.includes('numpy')
    ) {
      return { intent: 'DOMAIN_DS' };
    }

    // 13. Internships & Experience
    if (
      q.includes('innovexis') ||
      q.includes('internship') ||
      q.includes('intern') ||
      q.includes('intellihire') ||
      q.includes('lor') ||
      q.includes('recommendation letter') ||
      q.includes('arushi mittal')
    ) {
      return { intent: 'INTERNSHIP' };
    }

    if (
      q.includes('experience') ||
      q.includes('work history') ||
      q.includes('where has he worked') ||
      q.includes('career')
    ) {
      return { intent: 'EXPERIENCE' };
    }

    // 14. Skills & Tech Stack
    if (
      q.includes('skills') ||
      q.includes('tech stack') ||
      q.includes('technologies') ||
      q.includes('what does he know') ||
      q.includes('programming languages') ||
      q.includes('tools') ||
      q.includes('strongest technical') ||
      q.includes('technical areas')
    ) {
      return { intent: 'TECHNICAL_SKILLS' };
    }

    // 15. Research
    if (
      q.includes('research') ||
      q.includes('m2m') ||
      q.includes('telemetry') ||
      q.includes('paper')
    ) {
      return { intent: 'RESEARCH' };
    }

    // 16. Hackathons & Competitions
    if (
      q.includes('hackathon') ||
      q.includes('first commit') ||
      q.includes('bharat builds') ||
      q.includes('cloudinary') ||
      q.includes('hackindia')
    ) {
      return { intent: 'HACKATHONS' };
    }

    // 17. Certifications
    if (
      q.includes('certificat') ||
      q.includes('coursera') ||
      q.includes('hackerrank') ||
      q.includes('credentials') ||
      q.includes('honors')
    ) {
      return { intent: 'CERTIFICATIONS' };
    }

    // 18. Resume
    if (
      q.includes('resume') ||
      q.includes('cv') ||
      q.includes('download resume') ||
      q.includes('curriculum vitae')
    ) {
      return { intent: 'RESUME' };
    }

    // 19. Contact & Socials
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('whatsapp') ||
      q.includes('reach out') ||
      q.includes('get in touch') ||
      q.includes('hire') ||
      q.includes('linkedin') ||
      q.includes('github') ||
      q.includes('message')
    ) {
      return { intent: 'CONTACT' };
    }

    // 20. Opportunity Status / Availability
    if (
      q.includes('open to work') ||
      q.includes('available') ||
      q.includes('relocation') ||
      q.includes('remote') ||
      q.includes('full time')
    ) {
      return { intent: 'OPPORTUNITY_STATUS' };
    }

    return { intent: 'UNSUPPORTED', query: rawQuery };
  };

  return { detect, normalize };
})();
