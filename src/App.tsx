import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Compass, Github, Mail, Linkedin } from 'lucide-react';
import { motion } from "framer-motion";

function App() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        window.scrollTo({ top: 0, behavior: "smooth" });

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

        setTimeout(() => setSuccessMessage(""), 5000); // hide after 5s
      } else {
        console.error(data.error);
        alert("There was an error sending your message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("There was an error sending your message.");
    }
  };


  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projectsData = [
    {
      name: "Bank Loan Analysis Dashboard Using Power BI",
      duration: "July 2024 – August 2024",
      techStack: "SQL, Power BI, Microsoft Excel, AWS",
      skills: "Data Visualization, Predictive Analytics, Risk Analysis, Financial Data Modeling",
      image: "/images/bank.png",
      description: [
        "Designed interactive dashboards by integrating AWS-hosted credit and bank loan data, enhancing data accessibility by 12%.",
        "Utilized Power BI for predictive modeling, leading to a 25% reduction in loan default rates through comprehensive risk metrics analysis.",
        "Developed detailed reporting mechanisms to improve loan portfolio oversight and ensure compliance, boosting reporting efficiency by 30%.",
      ],
    },
    {
      name: "Brain Stroke Detection and Classification",
      duration: "August 2023 – January 2024",
      techStack: "Deep Learning, TensorFlow, Python, Cloud-based Visualization",
      skills: "Machine Learning, Image Processing, Neural Networks, Cloud Computing",
      image: "/images/brain.webp",
      description: [
        "Analyzed over 2,500 CT images to identify patterns and classify intracranial hemorrhages, achieving a training accuracy of 93.11% and a validation accuracy of 99.06%.",
        "Directed segmentation workflows that enhanced diagnostic efficiency of MRI/CT scans by 8% through cloud-based visualization techniques.",
        "Optimized model performance by employing advanced data augmentation techniques, reducing overfitting by 28%.",
      ],
    },
    {
      name: "Development of Locaro.in – A Hyperlocal E-commerce Platform",
      duration: "January 2022 – February 2024",
      techStack: "Web Development, Data Analytics, SQL, Pricing Optimization Models",
      skills: "Entrepreneurship, Market Research, Customer Analytics, Business Strategy",
      image: "/images/locaro.png",
      description: [
        "Founded and developed Locaro, connecting over 100 shops across Navi Mumbai, facilitating a hyperlocal e-commerce ecosystem.",
        "Devised customer analytics models to optimize pricing strategies, resulting in a 25% increase in sales.",
        "Secured INR 500,000 in funding by crafting and delivering compelling investor pitches, demonstrating strong business strategy and market research skills.",
      ],
    },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = ['home', 'about', 'projects'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 md:left-auto bg-black md:bg-transparent w-full md:w-auto flex-col md:flex-row gap-4 p-4 md:p-0`}>
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize ${currentSection === section ? 'text-blue-400' : 'hover:text-blue-400'} transition-colors`}
                  onClick={() => {
                    setCurrentSection(section);
                    setMenuOpen(false);
                  }}
                >
                  {section}
                </a>
              ))}
            </div>

            {/* <a
              href="#contact"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
            >
              Contact
            </a> */}

            <div className="flex gap-4 items-center">
              <a
                href="/AashisRoutResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Resume
              </a>

              <a
                href="#contact"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
              >
                Contact
              </a>
            </div>

          </div>
        </div>

      </nav>

      {successMessage && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-3 z-[9999] shadow-md">
          {successMessage}
        </div>
      )}
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.5}px, ${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`
          }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Aashis Rout
            </span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Business & Data Analyst</h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">Transforming Data into Actionable Insights</p>
          <Compass
            className="mx-auto"
            size={48}
            style={{
              transform: `rotate(${scrollY * 0.5}deg)`
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: Description + Skills */}
            <div className="space-y-6">
              <p className="text-gray-300">
                As a passionate Business and Data Analyst, I specialize in transforming complex data into actionable insights that drive business decisions.
              </p>
              <p className="text-gray-300">
                With expertise in data visualization, statistical analysis, and business intelligence tools, I help organizations optimize their operations and achieve strategic goals.
              </p>

              {/* Skills Section */}
              <div className="bg-gray-900 p-8 rounded-lg mt-6">
                <h3 className="text-2xl font-bold mb-6 text-white">Skills</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-2">
                    <p>Data Analysis</p>
                    <p>Business Intelligence</p>
                    <p>Statistical Modeling</p>
                  </div>
                  <div className="space-y-2">
                    <p>Data Visualization</p>
                    <p>Project Management</p>
                    <p>Strategic Planning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Profile Image */}
            <div className="flex justify-center">
              <motion.img
                ref={ref}
                src="/images/image.png"
                alt="Profile"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="rounded-lg w-full max-w-sm object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="group bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="aspect-video w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-400">Click to view more details</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg max-w-md mx-4 shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-black">{selectedProject.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{selectedProject.duration}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Tech Stack:</strong> {selectedProject.techStack}</p>
            <p className="text-sm text-gray-500 mb-4"><strong>Skills:</strong> {selectedProject.skills}</p>
            <p className="text-sm text-gray-500 mb-4"><strong>Description: </strong></p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {selectedProject.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Contact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">Let's connect and discuss how I can help your organization leverage data for success.</p>
              <div className="flex gap-4">
                <a href="#" className="p-2 hover:text-blue-400 transition-colors">
                  <Mail size={24} />
                </a>
                <a href="#" className="p-2 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-2 hover:text-blue-400 transition-colors">
                  <Github size={24} />
                </a>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;