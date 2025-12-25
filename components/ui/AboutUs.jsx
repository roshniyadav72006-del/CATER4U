import { Award, Users, Clock, Heart } from 'lucide-react';
import { Footer } from "@/components/ui/Footer";

export function AboutUS() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl text-white mb-4">About CATER4U</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Crafting memorable culinary experiences with passion and excellence since 2010
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  CATER4U was founded with a simple mission: to transform every event into an unforgettable culinary journey. What started as a small family-run catering service has grown into one of the region's most trusted names in event catering.
                </p>
                <p>
                  Our journey began in 2010 when our founder, a passionate chef with decades of experience, decided to share their love for exceptional food with the community. Today, we proudly serve hundreds of events each year, from intimate family gatherings to grand corporate celebrations.
                </p>
                <p>
                  Every dish we create is a testament to our commitment to quality, creativity, and customer satisfaction. We source the finest ingredients, work with talented chefs, and bring warmth and professionalism to every event we cater.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12 text-gray-900">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every dish, every detail, and every interaction with our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                We're more than caterers; we're part of your celebration and your community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Reliability</h3>
              <p className="text-gray-600">
                On-time service and consistent quality you can depend on, event after event.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Passion</h3>
              <p className="text-gray-600">
                Every meal we create is made with love, care, and genuine passion for culinary arts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-4 text-gray-900">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our talented chefs and dedicated staff bring years of experience and passion to every event
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 shadow-lg">
                  
                </div>
                <h3 className="text-xl mb-2 text-gray-900">Chef Professional</h3>
                <p className="text-purple-600 mb-2">Head Chef</p>
                <p className="text-gray-600 text-sm">
                  Bringing creativity and expertise to every culinary creation
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}