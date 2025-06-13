import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";
import HighlightText from "./HighlightText";
import Marquee from "react-fast-marquee";
import styles from "./CertificationSection.module.css";

import Google from "../../../assets/Images/certification img/Google-certificate-img.png";
import IBM from "../../../assets/Images/certification img/ibm-certification-img.png";
import Meta from "../../../assets/Images/certification img/meta-certification-img.png";
import Oracle from "../../../assets/Images/certification img/oracle-certification-img.png";
import Walmart from "../../../assets/Images/certification img/walmart-certification-img.png";
import Sony from "../../../assets/Images/certification img/sony-certificate-img.png";

const certifications = [
  {
    id: 1,
    name: "Google",
    image: Google,
  },
  {
    id: 2,
    name: "IBM",
    image: IBM,
  },
  {
    id: 3,
    name: "Meta",
    image: Meta,
  },
  {
    id: 4,
    name: "Oracle",
    image: Oracle,
  },
  {
    id: 5,
    name: "Walmart",
    image: Walmart,
  },
  {
    id: 6,
    name: "Sony",
    image: Sony,
  }
];

const CertificationSection = () => {
  return (
    <div className={`w-full py-20 ${styles.certificationContainer}`}>
      {/* Section Header */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.1 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl lg:text-4xl font-semibold text-white mb-4'>
          Our Technology
          <HighlightText text={" Partner"} />
        </h2>
      </motion.div>

      {/* Technology Partner Marquee */}
      <div className={styles.marqueeContainer}>
        <Marquee 
          direction="right" 
          speed={10} 
          delay={0} 
          loop={0} 
          gradient={true} 
          gradientColor="transparent" 
          gradientWidth={100}
        >
          {[...certifications, ...certifications].map((cert, index) => (
            <div key={`${cert.id}-${index}`} className={styles.imageWrapper}>
              <img src={cert.image} alt={cert.name} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bottom Section */}
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.1 }}
        className="text-center mt-12"
      >
        <div className="flex flex-wrap justify-center items-center gap-4 text-richblack-300">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-yellow-50 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Industry Recognized</span>
          </span>
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-caribbeangreen-300 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Career Boost</span>
          </span>
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-blue-400 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Global Standards</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificationSection;
