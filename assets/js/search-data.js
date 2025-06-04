// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "Research",
          description: "Everything Should Be Made as Simple as Possible, But Not Simpler --- Albert Einstein",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-people",
          title: "People",
          description: "Great people",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-gallery",
          title: "Gallery",
          description: "Some beautiful moments",
          section: "Navigation",
          handler: () => {
            window.location.href = "/gallery/";
          },
        },{id: "nav-openings",
          title: "Openings",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/openings/";
          },
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/photo-gallery/";
        
      },
    },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Posts",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-a-post-with-tabs",
      
        title: "a post with tabs",
      
      description: "this is what included tabs in a post could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/tabs/";
        
      },
    },{id: "post-a-post-with-typograms",
      
        title: "a post with typograms",
      
      description: "this is what included typograms code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/typograms/";
        
      },
    },{id: "post-a-post-that-can-be-cited",
      
        title: "a post that can be cited",
      
      description: "this is what a post that can be cited looks like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/post-citation/";
        
      },
    },{id: "post-a-post-with-pseudo-code",
      
        title: "a post with pseudo code",
      
      description: "this is what included pseudo code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/pseudocode/";
        
      },
    },{id: "post-a-post-with-code-diff",
      
        title: "a post with code diff",
      
      description: "this is how you can display code diffs",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/code-diff/";
        
      },
    },{id: "post-a-post-with-advanced-image-components",
      
        title: "a post with advanced image components",
      
      description: "this is what advanced image components could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/advanced-images/";
        
      },
    },{id: "post-a-post-with-vega-lite",
      
        title: "a post with vega lite",
      
      description: "this is what included vega lite code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/vega-lite/";
        
      },
    },{id: "post-a-post-with-geojson",
      
        title: "a post with geojson",
      
      description: "this is what included geojson code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/geojson-map/";
        
      },
    },{id: "post-a-post-with-echarts",
      
        title: "a post with echarts",
      
      description: "this is what included echarts code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/echarts/";
        
      },
    },{id: "post-a-post-with-chart-js",
      
        title: "a post with chart.js",
      
      description: "this is what included chart.js code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/chartjs/";
        
      },
    },{id: "post-a-post-with-tikzjax",
      
        title: "a post with TikZJax",
      
      description: "this is what included TikZ code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/tikzjax/";
        
      },
    },{id: "post-a-post-with-bibliography",
      
        title: "a post with bibliography",
      
      description: "an example of a blog post with bibliography",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/post-bibliography/";
        
      },
    },{id: "post-a-post-with-jupyter-notebook",
      
        title: "a post with jupyter notebook",
      
      description: "an example of a blog post with jupyter notebook",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/jupyter-notebook/";
        
      },
    },{id: "post-a-post-with-custom-blockquotes",
      
        title: "a post with custom blockquotes",
      
      description: "an example of a blog post with custom blockquotes",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/custom-blockquotes/";
        
      },
    },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
      
        title: "a post with table of contents on a sidebar",
      
      description: "an example of a blog post with table of contents on a sidebar",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/sidebar-table-of-contents/";
        
      },
    },{id: "post-a-post-with-audios",
      
        title: "a post with audios",
      
      description: "this is what included audios could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/audios/";
        
      },
    },{id: "post-a-post-with-videos",
      
        title: "a post with videos",
      
      description: "this is what included videos could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/videos/";
        
      },
    },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
      
        title: "displaying beautiful tables with Bootstrap Tables",
      
      description: "an example of how to use Bootstrap Tables",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/tables/";
        
      },
    },{id: "post-a-post-with-table-of-contents",
      
        title: "a post with table of contents",
      
      description: "an example of a blog post with table of contents",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/table-of-contents/";
        
      },
    },{id: "post-a-post-with-giscus-comments",
      
        title: "a post with giscus comments",
      
      description: "an example of a blog post with giscus comments",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2022/giscus-comments/";
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "post-a-post-with-redirect",
      
        title: "a post with redirect",
      
      description: "you can also redirect to assets like pdf",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/assets/pdf/example_pdf.pdf";
        
      },
    },{id: "post-a-post-with-diagrams",
      
        title: "a post with diagrams",
      
      description: "an example of a blog post with diagrams",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2021/diagrams/";
        
      },
    },{id: "post-a-distill-style-blog-post",
      
        title: "a distill-style blog post",
      
      description: "an example of a distill-style blog post and main elements",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2021/distill/";
        
      },
    },{id: "post-a-post-with-twitter",
      
        title: "a post with twitter",
      
      description: "an example of a blog post with twitter",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2020/twitter/";
        
      },
    },{id: "post-a-post-with-disqus-comments",
      
        title: "a post with disqus comments",
      
      description: "an example of a blog post with disqus comments",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/disqus-comments/";
        
      },
    },{id: "post-a-post-with-math",
      
        title: "a post with math",
      
      description: "an example of a blog post with some math",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/math/";
        
      },
    },{id: "post-a-post-with-code",
      
        title: "a post with code",
      
      description: "an example of a blog post with some code",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/code/";
        
      },
    },{id: "post-a-post-with-images",
      
        title: "a post with images",
      
      description: "this is what included images could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/images/";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/formatting-and-links/";
        
      },
    },{id: "news-we-received-the-pgrs-scholarship-fund-from-xjtlu",
          title: 'We received the PGRS scholarship fund from XJTLU.',
          description: "",
          section: "News",},{id: "news-our-group-website-is-online",
          title: 'Our group website is online! 🎉',
          description: "",
          section: "News",},{id: "news-ug-student-zhirui-xiang-did-a-poster-presentation-at-ses-2024-annual-meeting-hangzhou-hosted-by-westlake-university",
          title: 'UG student Zhirui Xiang did a poster presentation at SES 2024 Annual Meeting...',
          description: "",
          section: "News",},{id: "news-dr-wu-gave-an-invited-talk-at-ses-2024-annual-meeting-hangzhou-hosted-by-westlake-university",
          title: 'Dr. Wu gave an invited talk at SES 2024 Annual Meeting (Hangzhou) hosted...',
          description: "",
          section: "News",},{id: "news-dr-wu-gave-a-contributed-talk-at-ccs-conference-of-theory-computation-and-modeling-for-soft-matter-guangzhou",
          title: 'Dr. Wu gave a contributed talk at CCS Conference of Theory, Computation, and...',
          description: "",
          section: "News",},{id: "news-dr-wu-co-authored-a-paper-published-in-advanced-materials-field-induced-polarization-rotation-in-order-disorder-k-na-nbo3-based-ferroelectrics",
          title: 'Dr. Wu co-authored a paper published in Advanced Materials: Field-Induced Polarization Rotation in...',
          description: "",
          section: "News",},{id: "news-dr-wu-co-authored-a-review-paper-published-in-current-opinion-in-solid-state-materials-science-a-practical-guide-to-machine-learning-interatomic-potentials-status-and-future",
          title: 'Dr. Wu co-authored a review paper published in Current Opinion in Solid State...',
          description: "",
          section: "News",},{id: "news-zhirui-ug-student-published-a-first-author-paper-on-journal-of-physical-chemistry-b-force-field-benchmark-for-polydimethylsiloxane-density-heat-capacities-isothermal-compressibility-viscosity-and-thermal-conductivity",
          title: 'Zhirui (UG student) published a first-author paper on Journal of Physical Chemistry B:...',
          description: "",
          section: "News",},{id: "news-welcome-zhangtao-yi-join-our-group-zhangtao-will-work-as-research-assistant-with-topic-about-machine-learning-force-fields-for-polymers",
          title: 'Welcome Zhangtao Yi join our group! Zhangtao will work as research assistant with...',
          description: "",
          section: "News",},{id: "news-congratulations-to-zhirui-for-winning-the-best-poster-award-at-the-first-undergraduate-final-year-project-poster-event-at-xjtlu",
          title: 'Congratulations to Zhirui for winning the Best Poster Award at the First Undergraduate...',
          description: "",
          section: "News",},{id: "news-we-had-group-dinner-at-xinjiang-restaurant-to-celebrate-the-end-of-the-semester",
          title: 'We had group dinner at Xinjiang Restaurant to celebrate the end of the...',
          description: "",
          section: "News",},{id: "projects-chaoran-sui",
          title: 'Chaoran Sui',
          description: "Undergraduate (Chemistry)Final year project 2024⮕ M.Sc., Georgetown University, USA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Chaoran_Sui/";
            },},{id: "projects-haoqi-lyu",
          title: 'Haoqi Lyu',
          description: "Undergraduate Student (Chemistry)SURF 2024Continue his UG at University of Liverpool, UK",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Haoqi_Lyu/";
            },},{id: "projects-minghao-deng",
          title: 'Minghao Deng',
          description: "Master Student (Materials Science)B.Sc, Nanjing University of Posts and Telecommunications",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Minghao_Deng/";
            },},{id: "projects-weijian-zhang",
          title: 'Weijian Zhang',
          description: "Master Student (Chemistry)B.Sc, Shandong University",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Weijian_Zhang/";
            },},{id: "projects-xunhe-liu",
          title: 'Xunhe Liu',
          description: "Master Student (Chemistry)B.Sc, Taiyuan University of Technology",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Xunhe_Liu/";
            },},{id: "projects-yue-song",
          title: 'Yue Song',
          description: "Undergraduate (Chemistry)Final year project 2025",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Yue_Song/";
            },},{id: "projects-yuqi-wei",
          title: 'Yuqi Wei',
          description: "Undergraduate Student (Chemistry)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Yuqi_Wei/";
            },},{id: "projects-yuxiang-chen",
          title: 'Yuxiang Chen',
          description: "Undergraduate Student (Chemistry)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Yuxiang_Chen/";
            },},{id: "projects-zhangtao-yi",
          title: 'Zhangtao Yi',
          description: "PhD Student (Chemistry)B.Sc, Nanjing University",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Zhangtao_Yi/";
            },},{id: "projects-dr-zhenghao-wu",
          title: 'Dr. Zhenghao Wu',
          description: "Assistant ProfessorDepartment of ChemistryXi&#39;an Jiaotong Liverpool UniversityEmail&amp;#58; zhenghao.wu@xjtlu.edu.cn",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Zhenghao_Wu/";
            },},{id: "projects-zhirui-xiang",
          title: 'Zhirui Xiang',
          description: "Undergraduate Student (Chemistry)Research assistant[Github](https://github.com/RachelXiang)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Zhirui_Xiang/";
            },},{id: "projects-ziran-wu",
          title: 'Ziran Wu',
          description: "Undergraduate Student (Chemistry)Currently at University of Liverpool, UK",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Ziran_Wu/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%65%6E%67%68%61%6F.%77%75@%78%6A%74%6C%75.%65%64%75.%63%6E", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Chenghao-Wu# your GitHub user name", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=https://scholar.google.com/citations?hl=en&user=wo1zj5kAAAAJ&view_op=list_works&sortby=pubdate", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },];
