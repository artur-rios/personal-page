import type { Language } from '@/components/lang-provider';
import { Resume } from '@/types/resume';

// Mirrors the PDF resume (v9) in public/resume.pdf and public/curriculo.pdf. When the PDFs
// change, replace them and change this to match in the same commit.

export const resumeContact = {
  name: 'Artur Rios',
  email: 'arturdev@duck.com',
  linkedInUrl: 'https://www.linkedin.com/in/artur-rios',
};

export const resumes: Record<Language, Resume> = {
  en: {
    role: 'Senior Software Engineer',
    location: 'Mogi das Cruzes, São Paulo, Brazil',
    pdfUrl: '/resume.pdf',
    pdfFileName: 'Artur-Rios-Resume.pdf',
    headings: {
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Technical Skills',
      languages: 'Languages',
      technologies: 'Technologies',
      download: 'Download PDF',
    },
    summary:
      'Senior Software Engineer with a decade of experience building back-end systems and full-stack applications, primarily with .NET and AWS. Specialized in the financial sector, with work in foreign exchange, derivatives, and payments at Itaú, BTG Pactual, and XP Inc., including regulatory integrations, data reconciliation, and cloud modernization.',
    experience: [
      {
        company: 'XP Inc.',
        role: 'Senior Software Engineer',
        period: '09/2026 – present',
        description:
          'Develop software for XP Empresas, the business-banking unit of XP Inc. (R$1.5 trillion in client assets), focused on financial products and payment services. Currently building **XP Empresas Pay**, XP’s card-acquiring and payments platform for corporate clients, launched in July 2026.',
        tech: ['.NET', 'React', 'Azure DevOps', 'TypeScript'],
      },
      {
        company: 'CI&T',
        role: 'Senior Software Developer',
        period: '08/2025 – 08/2026',
        description:
          'Consultant for **Itaú Unibanco**’s foreign exchange and derivatives area. Itaú is Brazil’s largest FX bank and has led B3’s OTC derivatives ranking for nine years.',
        highlights: [
          'Built and maintained a .NET API integrating manually managed derivatives portfolios with the bank’s internal risk systems, improving reliability and efficiency.',
          'Evolved an ETL-based accounting reconciliation platform, ensuring data consistency and traceability to meet audit requirements.',
          'Helped shape the platform’s cloud modernization from day one, contributing to architecture decisions, technical standards, and component development.',
        ],
        tech: ['.NET', 'Angular', 'VBA', 'AWS'],
      },
      {
        company: 'BRQ Digital Solutions',
        role: 'Software Developer',
        period: '07/2023 – 08/2025',
        description:
          'Consultant for **BTG Pactual**, Latin America’s largest investment bank, on foreign exchange (FX) systems across the full transaction lifecycle.',
        highlights: [
          'Integrated FX operations into the back-office system and maintained communication with Banco Central do Brasil and the SWIFT network.',
          'Implemented regulatory requirements and new features, and resolved operational issues.',
          'Migrated legacy systems to the cloud and built custom reports.',
        ],
        tech: ['.NET', 'React', 'AWS (DynamoDB, RDS, SQS, SNS)', 'TypeScript'],
      },
      {
        company: 'Pantheon Inc.',
        role: 'Software Engineer',
        period: '08/2022 – 05/2023',
        description:
          'Built and maintained research applications for **ExxonMobil** professionals in areas such as chemical products, industrial equipment, and human resources, working across back-end, front-end, databases, and deployment in an agile team.',
        tech: ['.NET', 'Angular', 'React', 'Azure DevOps', 'TypeScript'],
      },
      {
        company: 'Accenture Brasil',
        role: 'Application Development Analyst',
        period: '10/2021 – 08/2022',
        description:
          'Modernized the front-end of the back-office system at **Santander Brasil**, a bank with 50+ million clients, during COVID-19, replacing paper-based signatures with digital ones. Worked on features, unit tests, deployment, and system integrations in an agile squad.',
        tech: ['Java', 'Angular', 'TypeScript'],
      },
      {
        company: 'Assistpay',
        role: 'Software Developer',
        period: '11/2018 – 09/2021',
        description:
          'Full-stack developer for internal systems, with on-premises and cloud deployments. Contributed to a full-system refactor, from database to UI, to scale onboarding of new clients, and built debt-recovery solutions (negotiation portal, automated email/SMS campaigns, chatbot) for clients such as **Sky**, **Neoenergia**, and **Cogna**.',
        tech: ['.NET', 'Angular', 'AWS (RDS, SES)', 'Jenkins'],
      },
      {
        company: 'Cedro Technologies',
        role: 'Software Developer Intern',
        period: '04/2018 – 11/2018',
        description:
          'Developed software for investment brokerages in Scrum teams: the back-end of a suitability questionnaire that profiles new investors, and a full-stack module for managing broker compensation.',
        tech: ['Java', 'Hibernate', '.NET', 'Angular', 'SQL Server'],
      },
      {
        role: 'Freelance Web Developer',
        period: '07/2016 – 12/2017',
        description:
          'Built websites for small local businesses, such as bakeries and convenience stores, and portfolio websites for photographers, using HTML, CSS, JavaScript, and Bootstrap.',
      },
    ],
    education: [
      {
        school: 'Universidade de São Paulo – USP/Esalq',
        degree: 'MBA in Software Engineering',
        period: '2025 – 2026',
      },
      {
        school: 'Universidade de Mogi das Cruzes',
        degree: 'Bachelor’s in Information Systems',
        period: '2016 – 2021',
      },
      {
        school: 'Escola Técnica Estadual Presidente Vargas',
        degree: 'Mechatronics Technician',
        period: '2013 – 2015',
      },
    ],
    skills: [
      {
        label: 'Languages & Frameworks',
        items:
          'C#, .NET / ASP.NET Core, Entity Framework, Angular, React, TypeScript, Java (Spring, Hibernate), Python, VBA',
      },
      {
        label: 'Cloud & DevOps',
        items:
          'AWS (Lambda, S3, RDS, DynamoDB, SQS, SNS, SES, EC2, Batch, CloudWatch), Azure DevOps, Jenkins',
      },
      {
        label: 'Data',
        items: 'ETL pipelines, SQL Server, PostgreSQL, MySQL, SQLite, Redis, DynamoDB',
      },
      {
        label: 'Domain',
        items:
          'Payments & acquiring, foreign exchange, derivatives, SWIFT, Banco Central do Brasil integrations',
      },
      {
        label: 'Practices',
        items: 'Software architecture, Agile/Scrum, unit testing, code review',
      },
    ],
    languages: 'Portuguese (native) · English (C2)',
  },
  pt: {
    role: 'Engenheiro de Software Sênior',
    location: 'Mogi das Cruzes, São Paulo',
    pdfUrl: '/curriculo.pdf',
    pdfFileName: 'Artur-Rios-Curriculo.pdf',
    headings: {
      summary: 'Resumo',
      experience: 'Experiência',
      education: 'Educação',
      skills: 'Competências Técnicas',
      languages: 'Idiomas',
      technologies: 'Tecnologias',
      download: 'Baixar PDF',
    },
    summary:
      'Engenheiro de Software Sênior com uma década de experiência no desenvolvimento de sistemas back-end e aplicações full-stack, principalmente com .NET e AWS. Especializado no setor financeiro, com atuação em câmbio, derivativos e meios de pagamento no Itaú, BTG Pactual e XP Inc., incluindo integrações regulatórias, conciliação de dados e modernização para a nuvem.',
    experience: [
      {
        company: 'XP Inc.',
        role: 'Engenheiro de Software Sênior',
        period: '09/2026 – atual',
        description:
          'Desenvolvo software para a XP Empresas, unidade de negócios PJ da XP Inc. (R$ 1,5 trilhão em ativos sob custódia), com foco em produtos financeiros e meios de pagamento. Atualmente atuo no **XP Empresas Pay**, solução de adquirência e pagamentos da XP para clientes pessoa jurídica, lançada em julho de 2026.',
        tech: ['.NET', 'React', 'Azure DevOps', 'TypeScript'],
      },
      {
        company: 'CI&T',
        role: 'Desenvolvedor de Software Sênior',
        period: '08/2025 – 08/2026',
        description:
          'Atuei na área de câmbio e derivativos do **Itaú Unibanco**, maior banco de câmbio do Brasil e líder há nove anos no ranking de derivativos de balcão da B3.',
        highlights: [
          'Desenvolvi e sustentei uma API .NET que integrava carteiras de derivativos manuais aos sistemas internos de risco, aumentando confiabilidade e eficiência.',
          'Evoluí uma plataforma de conciliação contábil baseada em pipelines de ETL, garantindo consistência e rastreabilidade dos dados para auditoria.',
          'Ajudei a definir a modernização da plataforma para a nuvem desde a concepção, atuando em decisões de arquitetura, padrões técnicos e desenvolvimento de componentes.',
        ],
        tech: ['.NET', 'Angular', 'VBA', 'AWS'],
      },
      {
        company: 'BRQ Digital Solutions',
        role: 'Desenvolvedor de Software',
        period: '07/2023 – 08/2025',
        description:
          'Atuei no **BTG Pactual**, maior banco de investimentos da América Latina, em sistemas de câmbio (FX) cobrindo todo o ciclo de vida das operações.',
        highlights: [
          'Integrei operações de câmbio ao sistema de back-office e mantive a comunicação com o Banco Central do Brasil e a rede SWIFT.',
          'Implementei exigências regulatórias e novas funcionalidades, e solucionei questões operacionais.',
          'Migrei sistemas legados para a nuvem e desenvolvi relatórios personalizados.',
        ],
        tech: ['.NET', 'React', 'AWS (DynamoDB, RDS, SQS, SNS)', 'TypeScript'],
      },
      {
        company: 'Pantheon Inc.',
        role: 'Engenheiro de Software',
        period: '08/2022 – 05/2023',
        description:
          'Desenvolvi e mantive aplicações de pesquisa para profissionais da **ExxonMobil** em áreas como produtos químicos, equipamentos industriais e recursos humanos, atuando em toda a stack (back-end, front-end, bancos de dados e implantação) em um time ágil.',
        tech: ['.NET', 'Angular', 'React', 'Azure DevOps', 'TypeScript'],
      },
      {
        company: 'Accenture Brasil',
        role: 'Analista Desenvolvedor de Aplicações',
        period: '10/2021 – 08/2022',
        description:
          'Modernizei o front-end do sistema de back-office do **Santander Brasil**, banco com mais de 50 milhões de clientes, durante a pandemia de COVID-19, substituindo assinaturas em papel por digitais. Atuei em funcionalidades, testes unitários, implantação e integrações em um squad ágil.',
        tech: ['Java', 'Angular', 'TypeScript'],
      },
      {
        company: 'Assistpay',
        role: 'Desenvolvedor de Software',
        period: '11/2018 – 09/2021',
        description:
          'Desenvolvedor full-stack de sistemas internos, com implantação on-premise e em nuvem. Contribuí para a reformulação completa de um sistema, do banco de dados à interface, para escalar a entrada de novos clientes, e desenvolvi soluções de recuperação de inadimplentes (portal de negociação, campanhas automatizadas por e-mail/SMS e chatbot) para clientes como **Sky**, **Neoenergia** e **Cogna**.',
        tech: ['.NET', 'Angular', 'AWS (RDS, SES)', 'Jenkins'],
      },
      {
        company: 'Cedro Technologies',
        role: 'Estagiário em Desenvolvimento de Software',
        period: '04/2018 – 11/2018',
        description:
          'Desenvolvi software para corretoras de investimentos em times Scrum: o back-end de um questionário de suitability para identificar o perfil de novos investidores e um módulo full-stack de gestão da remuneração de corretores.',
        tech: ['Java', 'Hibernate', '.NET', 'Angular', 'SQL Server'],
      },
      {
        role: 'Desenvolvedor Web Freelancer',
        period: '07/2016 – 12/2017',
        description:
          'Desenvolvi sites para pequenos negócios locais, como padarias e lojas de conveniência, e portfólios para fotógrafos, usando HTML, CSS, JavaScript e Bootstrap.',
      },
    ],
    education: [
      {
        school: 'Universidade de São Paulo – USP/Esalq',
        degree: 'MBA em Engenharia de Software',
        period: '2025 – 2026',
      },
      {
        school: 'Universidade de Mogi das Cruzes',
        degree: 'Bacharelado em Sistemas de Informação',
        period: '2016 – 2021',
      },
      {
        school: 'Escola Técnica Estadual Presidente Vargas',
        degree: 'Técnico em Mecatrônica',
        period: '2013 – 2015',
      },
    ],
    skills: [
      {
        label: 'Linguagens e Frameworks',
        items:
          'C#, .NET / ASP.NET Core, Entity Framework, Angular, React, TypeScript, Java (Spring, Hibernate), Python, VBA',
      },
      {
        label: 'Cloud e DevOps',
        items:
          'AWS (Lambda, S3, RDS, DynamoDB, SQS, SNS, SES, EC2, Batch, CloudWatch), Azure DevOps, Jenkins',
      },
      {
        label: 'Dados',
        items: 'Pipelines de ETL, SQL Server, PostgreSQL, MySQL, SQLite, Redis, DynamoDB',
      },
      {
        label: 'Domínio',
        items:
          'Meios de pagamento e adquirência, câmbio, derivativos, SWIFT, integrações com o Banco Central do Brasil',
      },
      {
        label: 'Práticas',
        items: 'Arquitetura de software, Agile/Scrum, testes unitários, code review',
      },
    ],
    languages: 'Português (nativo) · Inglês (C2)',
  },
};
