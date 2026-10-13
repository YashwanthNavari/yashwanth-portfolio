/**
 * Navari AI ? Response Builder Service
 * Constructs structured, readable responses from retrieved knowledge.
 */
window.NavariAI_ResponseBuilder = (() => {
  const R = () => window.NavariAI_Retrieval;
  const C = () => window.NavariAI_Context;

  const build = (intentResult) => {
    const retrieval = R();
    const context = C();
    const intent = intentResult.intent;

    switch (intent) {
      case 'GREETING': {
        return {
          title: 'Hello! I\'m Yashwanth AI',
          paragraphs: [
            'I am the interactive personal AI assistant for **Navari Yashwanth Reddy**.',
            'You can ask me about his technical background, machine learning projects, internships, Government of India patent, or how to contact him.'
          ],
          followUps: [
            'Tell me everything about Yashwanth',
            'Explore Projects',
            'Tell me about his internship',
            'What is his tech stack?'
          ]
        };
      }

      case 'PROFILE_COMPLETE': {
        const p = retrieval.getProfile();
        const exp = retrieval.getExperience();
        const research = retrieval.getResearch();
        const topProjects = retrieval.getProjects().slice(0, 3);

        return {
          title: 'Complete Executive Overview: Navari Yashwanth Reddy',
          paragraphs: [
            `**${p.name}** is an **${p.title}** based in ${p.location.city}, ${p.location.country}. He is dedicated to building practical, scalable intelligent systems spanning computer vision, machine learning, and IoT hardware telemetry.`
          ],
          sections: [
            {
              heading: '1. Academic Foundation & Education',
              bullets: [
                `**Degree:** ${p.education.degree} at ${p.education.institution} (${p.education.location})`,
                `**Timeline:** ${p.education.period} (${p.education.status})`,
                '**Specialization:** Data Science, Deep Learning architectures, and algorithmic system design.'
              ]
            },
            {
              heading: '2. Production Industry Experience',
              bullets: [
                '**Innovexis Pvt. Ltd. (Data Science with Gen AI Intern):** 3-month production internship completed October 2, 2026. Built data preprocessing pipelines, trained predictive ML models, and deployed Generative AI workflows.',
                '**Official Recognition:** Awarded both an official Certificate of Internship and an executive Letter of Recommendation (LOR) from Founder/CEO Arushi Mittal commending his technical capabilities.'
              ]
            },
            {
              heading: '3. Intellectual Property & Patents',
              bullets: [
                `**Govt. of India Design Patent Granted:** Design No. **${research.patent.designNumber}** (Class 14-02).`,
                `**Title:** ${research.patent.title} Architecture, officially registered by the Intellectual Property Office, Government of India (${research.patent.issueDate}).`,
                '**Engineering Scope:** Designed for resilient, low-latency machine-to-machine (M2M) sensor telemetry and industrial edge computing.'
              ]
            },
            {
              heading: '4. Core Technical Competencies',
              bullets: [
                '**Programming Languages:** Python, JavaScript, TypeScript, SQL, C/C++, Java, Go.',
                '**AI & Machine Learning:** PyTorch, TensorFlow, Scikit-Learn, CNNs, Random Forests, XGBoost.',
                '**Computer Vision:** OpenCV, YOLO Real-Time Object Detection, Facial and Demographic Analysis.',
                '**Generative AI & LLMs:** Prompt Engineering, Retrieval-Augmented Generation (RAG), Multi-Agent concepts.',
                '**Full-Stack & Data Systems:** React, Node.js, Express, Tailwind CSS, MySQL, PostgreSQL, MongoDB, Docker, Git.'
              ]
            },
            {
              heading: '5. Flagship Engineering Projects',
              bullets: [
                '**AgriSathi:** Smart farmer assistant combining predictive ML crop selection with IoT ground telemetry.',
                '**NeuroVision:** Real-time facial age and gender demographic detection using dual-head CNNs and OpenCV.',
                '**Smart Parking System:** Algorithmic parking slot indexing and management application in Python.'
              ]
            }
          ],
          projectCards: topProjects,
          links: [
            { label: 'View Interactive Resume', url: 'resume.html' },
            { label: 'Get In Touch / Contact', url: 'contact.html' }
          ],
          followUps: [
            'Tell me about his Innovexis internship',
            'Explain the IoT Patent',
            'Show me AgriSathi project',
            'How can I contact Yashwanth?'
          ]
        };
      }

      case 'RECRUITER_SUMMARY': {
        const p = retrieval.getProfile();
        return {
          title: 'Candidate Summary for Hiring Managers & Recruiters',
          paragraphs: [
            `**Candidate:** ${p.name} | ${p.title}`,
            `**Availability:** ${p.availability.status} (Open to Remote & On-Site Relocation).`,
            '**Key Qualifications:**',
          ],
          sections: [
            {
              heading: 'Highlights',
              bullets: [
                '**Hands-On AI/ML Experience:** 3 months of production internship at Innovexis delivering data pipelines and Generative AI workflows with CEO recommendation.',
                '**Patented Inventor:** Registered patent holder with the Government of India (Design No. 470097-001) for an IoT Connectivity Device.',
                '**Proven Problem Solver:** Hackathon participant in AWS First Commit and Cloudinary AI HackIndia 2026.',
                '**Strong Tech Stack:** Proficient in Python, Machine Learning, Computer Vision (OpenCV), SQL, and Full-Stack web development.'
              ]
            }
          ],
          links: [
            { label: 'View Interactive Resume', url: 'resume.html' },
            { label: 'Connect Directly via WhatsApp', url: 'https://api.whatsapp.com/send?phone=916303236366', isExternal: true },
            { label: 'Email: ekomotsu@gmail.com', url: 'mailto:ekomotsu@gmail.com', isExternal: true }
          ],
          followUps: [
            'Tell me about his projects',
            'What are his strongest skills?',
            'Tell me about his internship'
          ]
        };
      }

      case 'PROFILE_SHORT': {
        const p = retrieval.getProfile();
        return {
          title: 'About Navari Yashwanth Reddy',
          paragraphs: [
            `**${p.name}** is a final-year **${p.education.degree}** student at **${p.education.institution}** in Hyderabad, India.`,
            `${p.summaries.elevator}`,
            `**Engineering Philosophy:** ${p.philosophy}`
          ],
          sections: [
            {
              heading: 'Primary Specializations',
              bullets: [
                'AI & Machine Learning (PyTorch, Scikit-Learn, TensorFlow)',
                'Computer Vision & Real-Time Detection (OpenCV, YOLO, CNNs)',
                'Generative AI & LLM Application Workflows',
                'IoT Hardware & Embedded Systems (Govt. of India Patent Granted)'
              ]
            }
          ],
          followUps: [
            'Tell me everything about Yashwanth',
            'Show me his projects',
            'Tell me about his patent',
            'How can I contact him?'
          ]
        };
      }

      case 'EDUCATION': {
        const p = retrieval.getProfile();
        return {
          title: 'Education & Academic Background',
          paragraphs: [
            `**Degree:** ${p.education.degree}`,
            `**Institution:** ${p.education.institution}`,
            `**Location:** ${p.education.location}`,
            `**Duration:** ${p.education.period} (${p.education.status})`
          ],
          sections: [
            {
              heading: 'Academic Focus & Coursework',
              bullets: [
                'Data Science, Predictive Modeling & Statistical Inference',
                'Deep Learning Architectures, Computer Vision & CNNs',
                'Database Management Systems (Relational Design & 3NF Normalization)',
                'Design & Analysis of Algorithms and Data Structures',
                'Microcontroller Architecture & IoT Sensor Networks'
              ]
            }
          ],
          followUps: [
            'What technical skills does he have?',
            'What projects did he build at Woxsen?',
            'Tell me about his internship'
          ]
        };
      }

      case 'TECHNICAL_SKILLS': {
        const skillsObj = retrieval.getSkills();
        const sections = skillsObj.categories.map(c => ({
          heading: c.name,
          bullets: [c.description],
          techTags: c.skills
        }));

        return {
          title: 'Technical Skills & Competency Matrix',
          paragraphs: [
            'Yashwanth maintains a practical, production-focused technology stack centered on Python, Machine Learning, Computer Vision, and modern web frameworks:'
          ],
          sections: sections,
          followUps: [
            'Which projects use Computer Vision?',
            'Tell me about his Generative AI work',
            'Show me his IoT experience'
          ]
        };
      }

      case 'DOMAIN_CV': {
        const cvProjects = retrieval.getProjectsByDomain('vision');
        return {
          title: 'Computer Vision & Visual Inference',
          paragraphs: [
            'Yashwanth builds real-time computer vision systems with high frame-rate performance using **OpenCV**, **YOLO**, and custom **Convolutional Neural Networks (CNNs)**.'
          ],
          sections: [
            {
              heading: 'Key Computer Vision Projects',
              bullets: [
                '**Age & Gender Detection (NeuroVision):** Live facial analysis pipeline predicting demographic brackets under sub-50ms latency.',
                '**Real-Time Object Detection:** YOLO-powered multi-object classification and bounding box tracking for video feeds.'
              ],
              techTags: ['Python', 'OpenCV', 'CNN', 'YOLO', 'Deep Learning', 'PyTorch']
            }
          ],
          projectCards: cvProjects,
          followUps: [
            'Tell me about Age & Gender Detection',
            'Explain ML Object Detection',
            'Explore other projects'
          ]
        };
      }

      case 'DOMAIN_GENAI': {
        return {
          title: 'Generative AI & LLM Experience',
          paragraphs: [
            'Yashwanth applies Generative AI to solve practical workflow bottlenecks, having engineered LLM application pipelines during his 3-month internship at **Innovexis Pvt. Ltd.**'
          ],
          sections: [
            {
              heading: 'Core Generative AI Capabilities',
              bullets: [
                '**LLM Pipeline Integration:** Connecting foundation models with structured data stores for intelligent parsing and summary generation.',
                '**Prompt Engineering & Conditioning:** System prompt design, few-shot tuning, and deterministic output formatting.',
                '**RAG & Multi-Agent Concepts:** Research and prototyping of retrieval-augmented generation and coordinated AI agent workflows.',
                '**Tooling:** Hugging Face Transformers, Python, FastAPI, and OpenAI/Anthropic API paradigms.'
              ],
              techTags: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Hugging Face', 'RAG', 'Python']
            }
          ],
          followUps: [
            'Tell me about his Innovexis internship',
            'Explore all projects',
            'View his resume'
          ]
        };
      }

      case 'DOMAIN_ML':
      case 'DOMAIN_DS': {
        return {
          title: 'Machine Learning & Data Science',
          paragraphs: [
            'Yashwanth excels in transforming raw, heterogeneous datasets into validated predictive models using rigorous feature engineering, exploratory data analysis (EDA), and algorithmic benchmarking.'
          ],
          sections: [
            {
              heading: 'Methodologies & Frameworks',
              bullets: [
                '**Algorithms:** Supervised Learning (Random Forests, Gradient Boosting, SVMs, Logistic Regression) & Unsupervised Clustering.',
                '**Libraries:** Scikit-Learn, PyTorch, TensorFlow, Pandas, NumPy, Matplotlib, Seaborn.',
                '**Production Validation:** Cross-validation, ROC-AUC calibration, confusion matrices, and feature importance analysis.'
              ],
              techTags: ['Scikit-Learn', 'Pandas', 'NumPy', 'PyTorch', 'EDA', 'Feature Engineering']
            }
          ],
          projectCards: retrieval.getProjects().filter(p => p.category.includes('ML') || p.domain.includes('ML')),
          followUps: [
            'Tell me about Customer Churn project',
            'Explain AgriSathi project',
            'Tell me about his internship'
          ]
        };
      }

      case 'PROJECTS_ALL': {
        const allProjects = retrieval.getProjects();
        return {
          title: 'Engineering Projects Showcase',
          paragraphs: [
            `Yashwanth has built **${allProjects.length}+ verified engineering projects** across Machine Learning, Computer Vision, IoT Hardware, and Database Systems:`
          ],
          projectCards: allProjects,
          followUps: [
            'Tell me about AgriSathi',
            'Tell me about Age & Gender Detection',
            'Explain Smart Parking System',
            'Tell me about the Water Level Indicator'
          ]
        };
      }

      case 'SPECIFIC_PROJECT': {
        const p = retrieval.getProjectById(intentResult.project);
        if (!p) {
          return {
            title: 'Project Details',
            paragraphs: ['I could not find that specific project in the portfolio records. Here are his top projects:'],
            projectCards: retrieval.getProjects().slice(0, 3),
            followUps: ['Show me all projects']
          };
        }

        context.update('', 'SPECIFIC_PROJECT', { activeProject: p.id, currentTopic: 'projects' });

        return {
          title: p.title,
          paragraphs: [
            `**Domain:** ${p.category} | **Status:** ${p.status}`,
            p.description
          ],
          sections: [
            {
              heading: 'Problem Statement & Objective',
              bullets: [p.objective]
            },
            {
              heading: 'System Architecture & Implementation',
              bullets: [p.architecture]
            },
            {
              heading: 'Key Engineering Highlights',
              bullets: p.highlights,
              techTags: p.technologies
            }
          ],
          projectCards: [p],
          links: [
            p.repoUrl && p.repoUrl !== '#' ? { label: 'View Source Code on GitHub', url: p.repoUrl, isExternal: true } : null,
            { label: 'Explore on Projects Page', url: p.portfolioSection || 'projects.html' }
          ].filter(Boolean),
          followUps: [
            `What technologies does ${p.title} use?`,
            `How does ${p.title} work?`,
            'Explore other projects',
            'Tell me about his skills'
          ]
        };
      }

      case 'PROJECT_TECH': {
        const p = retrieval.getProjectById(intentResult.project);
        if (!p) {
          return {
            title: 'Project Technologies',
            paragraphs: ['Please specify which project you would like to inspect.'],
            followUps: ['Explore Projects']
          };
        }
        return {
          title: `Technologies Behind ${p.title}`,
          paragraphs: [
            `${p.title} leverages the following technology stack:`
          ],
          sections: [
            {
              heading: 'Tech Stack',
              bullets: [
                `**Core Languages & Frameworks:** ${p.technologies.join(', ')}`,
                `**Domain Focus:** ${p.domain}`
              ],
              techTags: p.technologies
            }
          ],
          projectCards: [p],
          followUps: [
            `How does ${p.title} work?`,
            'Explore other projects',
            'What are his general technical skills?'
          ]
        };
      }

      case 'PROJECT_ARCHITECTURE': {
        const p = retrieval.getProjectById(intentResult.project);
        if (!p) {
          return {
            title: 'Project Architecture',
            paragraphs: ['Please specify which project you would like to inspect.'],
            followUps: ['Explore Projects']
          };
        }
        return {
          title: `Architecture: ${p.title}`,
          paragraphs: [
            `Here is the technical architectural flow for **${p.title}**:`
          ],
          sections: [
            {
              heading: 'Pipeline Workflow',
              bullets: [p.architecture]
            },
            {
              heading: 'Engineering Highlights',
              bullets: p.highlights,
              techTags: p.technologies
            }
          ],
          projectCards: [p],
          followUps: [
            'Explore other projects',
            'Tell me about his internship',
            'View his resume'
          ]
        };
      }

      case 'INTERNSHIP':
      case 'EXPERIENCE': {
        const expList = retrieval.getExperience();
        const innovexis = expList.find(e => e.id === 'innovexis') || expList[0];

        return {
          title: 'Professional Experience & Internships',
          paragraphs: [
            `**Role:** ${innovexis.role} at **${innovexis.organization}**`,
            `**Period:** ${innovexis.period} (${innovexis.type})`,
            `**Corporate Backing:** ${innovexis.backer}`,
            innovexis.description
          ],
          sections: [
            {
              heading: 'Key Production Contributions',
              bullets: innovexis.contributions,
              techTags: innovexis.technologies
            },
            {
              heading: 'Executive Credentials & Letter of Recommendation',
              bullets: [
                '**Official Certificate of Internship:** Awarded on October 2, 2026 for completion of the 03-month Data Science with Gen AI program.',
                `**Letter of Recommendation (LOR):** Issued and signed by **${innovexis.leadSignatory}**, commending technical rigor, problem-solving, and dedication to machine learning delivery.`
              ]
            }
          ],
          links: [
            { label: 'View Certificate Scan', url: 'images/certs/innovexis_internship_certificate.png', isExternal: true },
            { label: 'View Recommendation Letter (LOR)', url: 'images/certs/innovexis_internship_letter.png', isExternal: true },
            { label: 'Explore Full Experience Page', url: 'experience.html' }
          ],
          followUps: [
            'Tell me about his IoT Patent',
            'What projects has he built?',
            'View his resume',
            'How can I contact him?'
          ]
        };
      }

      case 'PATENT': {
        const research = retrieval.getResearch();
        const pat = research.patent;

        return {
          title: 'Official Government of India Design Patent',
          paragraphs: [
            `**Title:** ${pat.title}`,
            `**Design Number:** **${pat.designNumber}** (Class 14-02)`,
            `**Issuing Authority:** ${pat.issuingAuthority}`,
            `**Grant / Issue Date:** ${pat.issueDate}`,
            `**Legal Standing:** Protected under ${pat.act}.`,
            pat.description
          ],
          sections: [
            {
              heading: 'Key Technical & Design Innovations',
              bullets: pat.keyFeatures,
              techTags: ['IoT Architecture', 'M2M Telemetry', 'Edge Computing', 'Microcontrollers', 'Embedded C++']
            }
          ],
          links: [
            { label: 'View Official Patent Certificate', url: pat.certificateUrl, isExternal: true },
            { label: 'Explore Certifications Page', url: 'certifications.html' }
          ],
          followUps: [
            'Tell me about his Innovexis internship',
            'What other research has he done?',
            'Explore projects'
          ]
        };
      }

      case 'RESEARCH': {
        const research = retrieval.getResearch();
        return {
          title: 'Research & Intellectual Property',
          paragraphs: [
            'Yashwanth engages in practical engineering research spanning IoT telemetry, edge artificial intelligence, and multi-agent coordination systems.'
          ],
          sections: [
            {
              heading: 'Granted Intellectual Property',
              bullets: [
                `**Govt. of India Patent (Design No. ${research.patent.designNumber}):** Patented IoT Connectivity Device Architecture for low-latency M2M communication.`
              ]
            },
            {
              heading: 'Active Research Domains',
              bullets: research.researchFocus.map(rf => `**${rf.domain}:** ${rf.description}`)
            }
          ],
          links: [
            { label: 'View Patent Certificate', url: research.patent.certificateUrl, isExternal: true }
          ],
          followUps: [
            'Tell me about his patent',
            'Tell me about his internship',
            'Show me his projects'
          ]
        };
      }

      case 'HACKATHONS': {
        const certs = retrieval.getCertifications();
        return {
          title: 'Hackathons & Technical Competitions',
          paragraphs: [
            'Yashwanth actively participates in collaborative software hackathons tackling AI product development and cloud infrastructure:'
          ],
          sections: certs.hackathons.map(h => ({
            heading: h.title,
            bullets: [
              `**Organizer:** ${h.organizer} (${h.date})`,
              `**Recognition:** ${h.recognition}${h.team ? ' | Team: ' + h.team : ''}`,
              h.description
            ]
          })),
          links: certs.hackathons.filter(h => h.certificateUrl).map(h => ({
            label: `View ${h.title} Certificate`,
            url: h.certificateUrl,
            isExternal: true
          })),
          followUps: [
            'What other certifications does he have?',
            'Tell me about his internship',
            'Explore projects'
          ]
        };
      }

      case 'CERTIFICATIONS': {
        const certs = retrieval.getCertifications();
        return {
          title: 'Certifications & Verified Credentials',
          paragraphs: [
            'Yashwanth holds verified academic honors, role certifications, and course credentials from globally recognized institutions:'
          ],
          sections: [
            {
              heading: 'University Honors & Specialized Courses',
              bullets: certs.coursesAndBadges.map(c => `**${c.title}** ? ${c.issuer} (${c.date})`)
            },
            {
              heading: 'Hackathons & Industry Credentials',
              bullets: certs.hackathons.map(h => `**${h.title}** ? ${h.organizer} (${h.date})`)
            }
          ],
          links: [
            { label: 'View Complete Certifications Page', url: 'certifications.html' }
          ],
          followUps: [
            'Tell me about his hackathons',
            'Tell me about his patent',
            'View his resume'
          ]
        };
      }

      case 'RESUME': {
        return {
          title: 'Curriculum Vitae & Resume',
          paragraphs: [
            'You can inspect Yashwanth\'s verified credentials, work history, and technical proficiencies directly on his interactive portfolio resume viewer.'
          ],
          sections: [
            {
              heading: 'Resume Overview',
              bullets: [
                '**Education:** B.Tech in Data Science, Woxsen University (2022-2026)',
                '**Internships:** Data Science with Gen AI Intern at Innovexis Pvt. Ltd.',
                '**Intellectual Property:** Govt. of India Design Patent No. 470097-001',
                '**Core Competencies:** Python, Machine Learning, Computer Vision, Generative AI, SQL'
              ]
            }
          ],
          links: [
            { label: 'Open Interactive Resume Viewer', url: 'resume.html' }
          ],
          followUps: [
            'Tell me about his internship',
            'How can I contact him?',
            'Tell me everything about Yashwanth'
          ]
        };
      }

      case 'CONTACT':
      case 'OPPORTUNITY_STATUS': {
        const contact = retrieval.getContact();
        return {
          title: 'Direct Contact & Inquiries',
          paragraphs: [
            `**Status:** ${contact.availability}`,
            `**Location:** ${contact.location} (Open for remote roles & on-site relocation)`,
            'You can connect directly with Yashwanth through any of the following channels:'
          ],
          sections: [
            {
              heading: 'Verified Channels',
              bullets: [
                `**Email:** ${contact.email}`,
                `**WhatsApp Fast Connect:** ${contact.whatsapp}`,
                `**LinkedIn:** [linkedin.com/in/navari-yashwanth-reddy](${contact.links.linkedin})`,
                `**GitHub:** [github.com/YashwanthNavari](${contact.links.github})`
              ]
            }
          ],
          links: [
            { label: 'Send WhatsApp Message', url: contact.whatsappUrl, isExternal: true },
            { label: 'Open Contact Form Page', url: contact.links.contactPage },
            { label: 'LinkedIn Profile', url: contact.links.linkedin, isExternal: true },
            { label: 'GitHub Repository', url: contact.links.github, isExternal: true }
          ],
          followUps: [
            'Why should I hire Yashwanth?',
            'View his resume',
            'Explore projects'
          ]
        };
      }

      default: {
        return {
          title: 'How can I assist you?',
          paragraphs: [
            'I may not have verified information answering that exact phrasing, but I can help you explore verified details about **Navari Yashwanth Reddy**.'
          ],
          sections: [
            {
              heading: 'Suggested Topics',
              bullets: [
                '**Complete Background:** Ask *"Tell me everything about Yashwanth"*',
                '**Projects:** Ask about *AgriSathi*, *NeuroVision*, *Smart Parking*, or *Object Detection*',
                '**Experience:** Ask about his *Innovexis Gen AI Internship* or *Government of India Patent*',
                '**Skills:** Ask about his *Tech Stack*, *Computer Vision*, or *Machine Learning*'
              ]
            }
          ],
          followUps: [
            'Tell me everything about Yashwanth',
            'Explore Projects',
            'Tell me about his internship',
            'How can I contact him?'
          ]
        };
      }
    }
  };

  return { build };
})();
