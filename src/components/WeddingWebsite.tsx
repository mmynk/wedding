import ElegantRSVPForm from './ElegantRSVPForm';
import InvitationVideoPlayer from './InvitationVideoPlayer';
import SectionDivider from './Divider';
import { TexturePattern } from './TexturePattern';
import WardrobeCarousel from './Wardrobe';

const Navigation = () => (
  <nav className="fixed w-full bg-white bg-opacity-95 shadow-sm z-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-center items-center h-16">
        <div className="space-x-8 text-gray-700">
          {[
            'Home',
            'Details',
            'Wardrobe',
            'Invitation',
            'RSVP',
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="relative hover:text-gray-900 transition-colors duration-200 after:content-[''] after:absolute after:w-0 after:h-px after:bottom-[-2px] after:left-0 after:bg-gray-700 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ couple = { partner1: 'Reethika', partner2: 'Mohit' } }) => (
  <section id="home" className="relative pt-16 h-[80vh]">
    <img
      src="./reemo.png"
      alt="Wedding Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="font-playfair text-5xl md:text-7xl mb-4">
          {couple.partner1} & {couple.partner2}
        </h1>
        <p className="text-xl md:text-2xl">...are tying the knot! 💍</p>
      </div>
    </div>
  </section>
);

const Details = ({ weddingDetails = {
  days: 'Saturday & Sunday',
  date: 'March 8-9, 2025',
  venue: 'Silver Oak Tropical Resort',
  address: 'Warikh Aali, Nagaon, Uran',
  location: 'Navi Mumbai, Maharashtra',
} }) => (
  <section id="details" className="relative py-20">
    {/* Background texture */}
    <div className="absolute inset-0 bg-[#faf7f2]">
      <TexturePattern />
    </div>

    {/* Decorative top border */}
    <div className="absolute top-0 left-0 right-0 h-4">
      <div className="h-full bg-repeat-x" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L20 16H0L10 0Z' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '20px 4px'
      }}/>
    </div>

    {/* Content */}
    <div className="relative max-w-4xl mx-auto px-4 text-center">
      <h2 className="font-playfair text-4xl mb-12 text-gray-800">
        The Details
      </h2>
      <div className="relative bg-white/70 backdrop-blur-sm rounded-lg shadow-lg">
        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gray-400/30 rounded-tl-lg"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-gray-400/30 rounded-tr-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-gray-400/30 rounded-bl-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gray-400/30 rounded-br-lg"></div>

        <div className="px-8 py-12">
          <div className="mb-12">
            <h3 className="text-2xl mb-4 font-playfair">When</h3>
            <p className="text-gray-600 text-lg">
              {weddingDetails.days}<br/>
              {weddingDetails.date}
            </p>
          </div>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center my-8">
            <div className="h-px w-16 bg-gray-300"></div>
            <div className="mx-4">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L14.5 8.5L20 9.3L16 13.4L17 19L12 16.3L7 19L8 13.4L4 9.3L9.5 8.5L12 3Z"/>
              </svg>
            </div>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl mb-4 font-playfair">Where</h3>
            <p className="text-gray-600 text-lg">
              {weddingDetails.venue}<br/>
              {weddingDetails.address}<br/>
              {weddingDetails.location}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Decorative bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-4 rotate-180">
      <div className="h-full bg-repeat-x" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L20 16H0L10 0Z' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
        backgroundSize: '20px 4px'
      }}/>
    </div>
  </section>
);

const WeddingWebsite = () => {
  return (
    <div className="relative min-h-screen bg-[#faf7f2] font-cormorant">
      {/* Apply background pattern to the entire screen */}
      <TexturePattern />

      <div className="relative z-10">
        {/* Content */}
        <Navigation />
        <Hero />
        <SectionDivider index={0} /><br/><br/><br/>
        <Details />
        <SectionDivider index={1} /><br/><br/><br/>
        <WardrobeCarousel />
        <SectionDivider index={2}/><br/><br/><br/>
        <InvitationVideoPlayer />
        <br/><br/><br/><br/><br/><br/>
        <SectionDivider index={3}/>
        <ElegantRSVPForm />
      </div>
    </div>
  );
};

export default WeddingWebsite;
