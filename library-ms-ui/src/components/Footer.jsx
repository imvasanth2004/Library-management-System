import React from 'react';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';

function Footer() {
    return (
        <footer className="bg-gray-500 text-white py-10 mt-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">Get in Touch</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                            <img src={instagram} alt="Instagram Logo" className="w-5 h-5" />
                            <span>Instagram</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <img src={facebook} alt="Facebook Logo" className="w-5 h-5" />
                            <span>Facebook</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <img src={linkedin} alt="LinkedIn Logo" className="w-5 h-5" />
                            <span>LinkedIn</span>
                        </li>
                    </ul>
                </div>

            
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">Use Cases</h4>
                    <ul className="space-y-2">
                        <li>UI Design</li>
                        <li>Wireframing</li>
                        <li>Developing</li>
                      
                    </ul>
                </div>

                
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">Explore</h4>
                    <ul className="space-y-2">
                        <li>Design Systems</li>
                        <li>Collaboration Features</li>
                        <li>Future</li>
                    </ul>
                </div>

               
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">Resources</h4>
                    <ul className="space-y-2">
                        <li>Study</li>
                        <li>Support</li>
                        <li>Developer Tools</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-8">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;


