import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="about-container">
      
      <h1>About Us</h1>

      {/* About Image */}
      <Image
        src="/about.jpg"
        alt="Catering Service"
        width={500}
        height={300}
        className="about-image"
      />

      <p>
        Cater4U is a web-based catering management system developed as a
        college project. It helps users easily plan and manage catering
        services for various events using technology.
      </p>

    </div>
  );
}
