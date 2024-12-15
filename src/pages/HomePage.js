import React from 'react';
import './../css/HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <header>
                <h1>Emrah Kösen</h1>
                <p className="contact-info">
                      emrahkosen@gmail.com |  <a href="https://github.com/emrahkosen" target="_blank" rel="noopener noreferrer">github.com/emrahkosen</a>
                </p>
            </header>
            <section>
                <h2>Computer Engineer</h2>
                <h3>About Me</h3>
                <p>My name is Emrah Kösen. I am a hard-working person. I am a good timekeeper, always willing to learn and develop new skills. I have a creative mind and work well in a team.</p>

                <h3>Education</h3>
                <p><strong>2012-2020:</strong> Middle East Technical University - ODTÜ, Ankara<br />
                   Computer Engineering - GPA: 2.60</p>
                <p>Graduation date: June 2020</p>
                <p>Learned: English, Chinese, Latex, C/C++, Python, Haskell, Prolog, SQL, Java</p>

                <h3>Software Skills</h3>
                <ul>
                    <li>Data Structures</li>
                    <li>MongoDB</li>
                    <li>Object-oriented programming</li>
                    <li>Design Patterns</li>
                </ul>

                <h3>Programming Skills</h3>
                <ul>
                    <li>C/C++</li>
                    <li>Assembly</li>
                    <li>SQL</li>
                    <li>HTML</li>
                </ul>

                <h3>Languages</h3>
                <ul>
                    <li>Turkish: Native</li>
                    <li>English: Professional</li>
                    <li>Persian: Beginner</li>
                    <li>Chinese: Beginner</li>
                </ul>

                <h3>Career Summary</h3>
                <ul>
                    <li>Algorithm</li>
                    <li>Docker</li>
                    <li>Functional Programming</li>
                    <li>ECMAScript</li>
                    <li>Problem Solving</li>
                    <li>PostgreSQL</li>
                    <li>UML Diagrams</li>
                    <li>Java</li>
                    <li>Prolog</li>
                    <li>JSON</li>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Haskell</li>
                    <li>NoSQL</li>
                    <li>ReactJS</li>
                    <li>Computer Network</li>
                    <li>Cloud Computing</li>
                    <li>Multi-Threaded Programming</li>
                    <li>Javascript</li>
                    <li>Verilog</li>
                    <li>YAML</li>
                    <li>Latex</li>
                </ul>

                <h3>Professional Experience</h3>
                <div className="experience-item">
                    <h4>Havelsan A.S</h4>
                    <p>Software Engineer</p>
                    <p><strong>From:</strong> June 15, 2021 - Present</p>
                    <p>Technologies: Advent Project - Java, MySQL, React, Spring Boot</p>
                </div>



                <div className="experience-item">
                    <h4>Akbank T.A.S Dijital Bankacılık Ve Ödeme Sistemleri</h4>
                    <p>Software Engineer</p>
                    <p><strong>From:</strong> March 8, 2021 - <strong>To:</strong> June 11, 2021</p>
                    <p>Technologies: Java, React.js, .net, .net core, SQL, Kubernetes, CI/CD, Microservices</p>
                </div>

                <div className="experience-item">
                    <h4>Pia Bilgi Dağıtım Hizmetleri</h4>
                    <p>Software Engineer</p>
                    <p><strong>From:</strong> July 13, 2020 - <strong>To:</strong> February 19, 2021</p>
                    <p>Technologies: Java Spring Boot - Camunda - MongoDB - Docker - Kubernetes - Jenkins - CI/CD, Microservices</p>
                </div>

                <div className="experience-item">
                    <h4>Matriks Bilgi Dağıtım Hizmetleri</h4>
                    <p>Software Engineer (Internship)</p>
                    <p><strong>From:</strong> July 29, 2019 - <strong>To:</strong> September 17, 2019</p>
                    <p>Networking (High Frequency Trading - C/C++ - Multithreading - Spinlock - Atomic - LockFree - Mutex - Semaphore)</p>
                </div>

                <div className="experience-item">
                    <h4>Matriks Bilgi Dağıtım Hizmetleri</h4>
                    <p>Software Engineer (Internship)</p>
                    <p><strong>From:</strong> June 11, 2019 - <strong>To:</strong> July 23, 2019</p>
                    <p>Developed web applications (JavaScript - NodeJs - Rest API Test - Promises - Async - Await)</p>
                </div>
  

             
                <h3>Achievements</h3>
                <ul>
                    <li>The Top Student Of The High School</li>
                    <li>Honor Student (2016-2017/2 - 2018-2019/1)</li>
                    <li>Ranked 3rd among METU CENG Senior Projects (LPWAN)</li>
                </ul>

                <h3>Projects</h3>
                <h4>LPWAN</h4>
                <p>Ranked 3rd among METU CENG Senior Projects</p>
                <p>The project LPWAN (IoT Platform for Asset Tracking with Low-Power Wide-Area Network) aims to develop a system that will continuously receive data from Lora sensors, transfer it to cloud/remote server via gateways and store data in it. Then, the system will detect the probable location of the objects (traffic lights, signs etc.) by comparing the sensors’ signal strength taken by gateways.</p>

                <p>NOTE: You can see my studies at my GitHub address: <a href="https://github.com/emrahkosen" target="_blank" rel="noopener noreferrer">github.com/emrahkosen</a></p>
            </section>
        </div>
    );
};

export default HomePage;
