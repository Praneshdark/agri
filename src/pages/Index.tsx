
import { Leaf, Users, Target, Award, Phone, Mail, MapPin, ArrowRight, Menu, MessageCircle, X, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { getGeminiResponse } from "@/lib/gemini";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

// Import staff images
import bagavathirajImg from "@/images/staffs/Bagavathiraj.jpg";
import keerthanaImg from "@/images/staffs/keer.jpg";
import geethaImg from "@/images/staffs/geeta.jpg";

// Import vendor logos
import rallisLogo from "@/images/Rallis_Logo.jpg";
import gitajiLogo from "@/images/Gitaji.png";
import krLogo from "@/images/KR.jpeg";
import tropicalLogo from "@/images/Tropical.jpeg";
import meenakshiLogo from "@/images/mac.png";
import sumukhaLogo from "@/images/Sumukha.png";
import growgroupLogo from "@/images/Growgroup.png";
import paruatLogo from "@/images/Paruat.png";
import iconLogo from "@/images/Icon.jpeg";
import companyLogo from "@/images/logo.jpg";
import heroImage from "@/images/WhatsApp Image 2025-07-24 at 11.42.11_60f32998.jpg";
import cardamomImg from "@/images/Cardamom.jpg";

// import branch images
import ho1 from "@/images/branch/HO/WhatsApp Image 2025-07-04 at 21.39.57_0dd316e9.jpg";
import ho2 from "@/images/branch/HO/WhatsApp Image 2025-07-04 at 21.39.57_78e69431.jpg";
import ho3 from "@/images/branch/HO/WhatsApp Image 2025-07-04 at 21.40.00_3381ae69.jpg";
import ho4 from "@/images/branch/HO/WhatsApp Image 2025-07-04 at 21.46.55_238b5c1a.jpg";

import b1_1 from "@/images/branch/b-1/WhatsApp Image 2025-07-06 at 19.25.17_d8c0b919.jpg";
import b1_2 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.10_11afc966.jpg";
import b1_3 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.10_6533be02.jpg";
import b1_4 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.11_92f3da34.jpg";
import b1_5 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.11_f75b04cb.jpg";
import b1_6 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.14_a8d48a0e.jpg";
import b1_7 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.14_e7d2860f.jpg";
import b1_8 from "@/images/branch/b-1/WhatsApp Image 2025-07-09 at 17.54.15_4b0fe690.jpg";

import b2_1 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.34.48_6d1b52c1.jpg";
import b2_2 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.34.49_3c6af145.jpg";
import b2_3 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.22_8e094ca0.jpg";
import b2_4 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.22_b91c4000.jpg";
import b2_5 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.23_3c41c861.jpg";
import b2_6 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.23_da4c260f.jpg";
import b2_7 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.24_021ea54a.jpg";
import b2_8 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.24_2cdf717b.jpg";
import b2_9 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.24_84f4d04e.jpg";
import b2_10 from "@/images/branch/b-2/WhatsApp Image 2025-07-06 at 19.35.25_06a28b41.jpg";

import b3_1 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.30_9fc79526.jpg";
import b3_2 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.31_4ee3a994.jpg";
import b3_3 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.31_6e0599f0.jpg";
import b3_4 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.32_3304f890.jpg";
import b3_5 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.32_86e5329c.jpg";
import b3_6 from "@/images/branch/b-3/WhatsApp Image 2025-07-06 at 19.42.32_bd94c93b.jpg";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Hello! How can I help you with your agricultural needs today?" },
  ]);
  const [galleryBranch, setGalleryBranch] = useState<null | { title: string; images: string[] }>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // auto slide when gallery open
  useEffect(() => {
    if (galleryBranch && carouselApi) {
      const id = setInterval(() => {
        carouselApi.scrollNext();
      }, 3000);
      return () => clearInterval(id);
    }
  }, [galleryBranch, carouselApi]);
  
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatInput("");
    setMessages((m) => [...m, { sender: "user", text: userText }]);
    const reply = await getGeminiResponse(userText);
    setMessages((m) => [...m, { sender: "bot", text: reply }]);
  };
  
  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation(0.2);
  const aboutAnimation = useScrollAnimation(0.1);
  const missionAnimation = useScrollAnimation(0.1);
  const teamAnimation = useScrollAnimation(0.1);
  const statsAnimation = useScrollAnimation(0.1);
  const contactAnimation = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-lg shadow-sm border-b border-white/20 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={companyLogo} alt="Care & Cure Logo" className="h-10 sm:h-12 w-auto object-contain p-1 bg-white rounded-full ring-1 ring-white/50" />
            <span className="text-lg sm:text-xl font-bold text-green-800">Care & Cure Groups</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-green-700 hover:text-green-600 transition-colors duration-200">Home</a>
            <a href="#about" className="text-green-700 hover:text-green-600 transition-colors duration-200">About</a>
            <a href="#services" className="text-green-700 hover:text-green-600 transition-colors duration-200">Services</a>
            <a href="#mission" className="text-green-700 hover:text-green-600 transition-colors duration-200">Mission</a>
            <a href="#team" className="text-green-700 hover:text-green-600 transition-colors duration-200">Team</a>
            <a href="#branches" className="text-green-700 hover:text-green-600 transition-colors duration-200">Branches</a>
            <a href="#vendors" className="text-green-700 hover:text-green-600 transition-colors duration-200">Vendors</a>
            <a href="#contact" className="text-green-700 hover:text-green-600 transition-colors duration-200">Contact</a>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white hidden sm:block transition-all duration-200 text-sm px-4 py-2">
              Get Quote
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full bg-white/70 backdrop-blur-lg rounded-b-2xl shadow-xl pt-8 pb-10">
                <div className="flex flex-col space-y-6 mt-8">
                  <a href="#home" className="text-green-700 hover:text-green-600 transition-colors text-lg">Home</a>
                  <a href="#about" className="text-green-700 hover:text-green-600 transition-colors text-lg">About</a>
                  <a href="#services" className="text-green-700 hover:text-green-600 transition-colors text-lg">Services</a>
                  <a href="#mission" className="text-green-700 hover:text-green-600 transition-colors text-lg">Mission</a>
                  <a href="#team" className="text-green-700 hover:text-green-600 transition-colors text-lg">Team</a>
                  <a href="#branches" className="text-green-700 hover:text-green-600 transition-colors text-lg">Branches</a>
                  <a href="#vendors" className="text-green-700 hover:text-green-600 transition-colors text-lg">Vendors</a>
                  <a href="#contact" className="text-green-700 hover:text-green-600 transition-colors text-lg">Contact</a>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full mt-4">
                    Get Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 sm:pt-20 pb-12 sm:pb-16 hero-gradient relative">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
          <div ref={heroAnimation.ref} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 sm:space-y-8 text-center lg:text-left transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-20px]'}`}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 leading-tight">
                Premium Fertilizers for 
                <span className="text-green-600 block">Sustainable Growth</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Care and Cure Agro Trading Company provides high-quality agricultural fertilizers 
                to help farmers achieve exceptional crop yields while caring for the environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 transition-all duration-200 hover:shadow-lg text-sm sm:text-base">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 transition-all duration-200 text-sm sm:text-base">
                  Learn More
                </Button>
              </div>
            </div>
            <div className={`relative mt-8 lg:mt-0 transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[20px]'}`}>
              <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <img 
                  src={heroImage} 
                  alt="Agricultural Field" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-leaf-pattern relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={aboutAnimation.ref} className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${aboutAnimation.isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[10px]'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">About Care & Cure Agro Trading Company</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Established on 11th August 2022, Care & Cure Agro Trading Company is a dedicated retail and wholesale business specializing in agricultural fertilizers.
            </p>
          </div>
          
          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-center">
              With years of hands-on expertise and a deep understanding of modern farming needs, we not only supply high-quality fertilizers that enhance crop productivity and promote sustainable agriculture but also provide field-level consultation with technical expertise to farmers. Our team works closely with farmers to assess their specific crop and soil requirements, ensuring they receive the right products — delivered on time, every time. Committed to excellence, soil health, and environmental sustainability, Care & Cure has become a trusted partner for farming communities across the region, helping them achieve higher yields with confidence.
            </p>
          </div>
          
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-200 ${aboutAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Quality Products</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We source and provide only the finest quality fertilizers that meet international standards 
                  for optimal crop nutrition.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Farmer Support</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our expert team provides comprehensive support and guidance to farmers for 
                  maximizing their agricultural productivity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Proven Results</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Thousands of satisfied farmers have achieved remarkable crop yields using 
                  our premium fertilizer solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-pattern-light relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">Our Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive agricultural solutions for modern farming</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Premium Fertilizers",
                desc: "High-quality organic and chemical fertilizers tailored for different crop needs",
              },
              {
                title: "Expert Consultation",
                desc: "Professional guidance on fertilizer selection and application techniques",
              },
              {
                title: "Timely Delivery",
                desc: "Reliable supply chain ensuring fertilizers reach you when you need them",
              },
            ].map((item, i) => (
              <Card key={i} className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-dots bg-pattern-light relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={missionAnimation.ref} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className={`space-y-6 sm:space-y-8 order-2 lg:order-1 transition-all duration-1000 ${missionAnimation.isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-20px]'}`}>
              <div>
                <div className="flex items-center mb-3 sm:mb-4 justify-center lg:justify-start">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Our Mission</h2>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                  To empower farmers by providing high-quality fertilizers, timely delivery, and expert field consultation tailored to their specific agricultural needs. We are dedicated to enhancing crop productivity, supporting sustainable farming practices, and building long-term partnerships that drive growth, food security, and environmental responsibility.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3 sm:mb-4 justify-center lg:justify-start">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Our Vision</h2>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                  To be the region's most trusted and innovative agricultural trading company — a go-to partner for farmers seeking reliable products, technical expertise, and sustainable solutions that ensure long-term soil health and agricultural prosperity.
                </p>
              </div>
            </div>

            <div className={`relative order-1 lg:order-2 transition-all duration-1000 delay-300 ${missionAnimation.isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[20px]'}`}>
              <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={cardamomImg}
                  alt="Cardamom cultivation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-700/70 to-green-500/70 flex flex-col items-center justify-center text-white text-center p-4">
                  <Leaf className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-3 sm:mb-4 opacity-90" />
                  <h3 className="text-xl sm:text-2xl font-bold">Growing Together</h3>
                  <p className="text-green-100 mt-2 text-sm sm:text-base">For a Sustainable Future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section id="team" className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="bg-dots absolute inset-0 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={teamAnimation.ref} className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${teamAnimation.isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[10px]'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">Leadership Team</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders driving our mission to transform agriculture
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${teamAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <Card className="border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                  <img 
                    src={bagavathirajImg} 
                    alt="Mr. Bagavathiraj" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Mr. Bagavathiraj</h3>
                <p className="text-green-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Chief Executive Officer</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Over 15 years of deep expertise in the agriculture sector. With a strong background in fertilizer products, crop nutrition, and field consultation, he has played a pivotal role in driving innovation and sustainable practices in modern farming. Under his leadership, the company has grown into a trusted name for quality agricultural solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                  <img 
                    src={keerthanaImg} 
                    alt="Mrs. Keerthana" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Mrs. Keerthana</h3>
                <p className="text-green-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Managing Director</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  A strong foundation in horticulture and a deep understanding of agricultural business dynamics. As a skilled business strategy analyst, she plays a key role in optimizing operations and aligning resources to drive sustainable growth. Her strategic insight and leadership have significantly contributed to the company's expansion and long-term vision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                  <img 
                    src={geethaImg} 
                    alt="Mrs. Geetha" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Mrs. Geetha</h3>
                <p className="text-green-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Managing Director</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  An extensive expertise in agricultural products and business operations. She oversees company stock management and maintains strong relationships with shareholders, ensuring transparency and stability. Her deep product knowledge and leadership have been instrumental in enhancing the company's market position and operational efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-green relative">
        <div className="bg-dots absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={statsAnimation.ref} className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white transition-all duration-1000 ${statsAnimation.isVisible ? 'animate-gentle-bounce' : 'opacity-0 translate-y-[10px]'}`}>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">4+</div>
              <div className="text-green-100 text-xs sm:text-sm lg:text-base">Years of Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">300+</div>
              <div className="text-green-100 text-xs sm:text-sm lg:text-base">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">1000+</div>
              <div className="text-green-100 text-xs sm:text-sm lg:text-base">Hectares Consulted</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">10+</div>
              <div className="text-green-100 text-xs sm:text-sm lg:text-base">Reputed Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-12 sm:py-16 lg:py-20 bg-leaf-pattern relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">Our Branches</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Visit any of our locations for quality agricultural products and expert consultation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Care and Cure Agro Trading Company (HO)</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      W-12/ D.NO.45B, Thottiyar Kaliyamman Kovil St, Gudalur, Theni, Tamil Nadu - 625518
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">+91-8072433016</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">careandcureagro@gmail.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">Mon–Sat: 6:00 AM – 8:00 PM</p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50" onClick={() => setGalleryBranch({title: "Care and Cure Agro Trading Company (HO)", images: [ho4,ho1,ho2,ho3]})}>View Gallery</Button>
                    <a 
                      href="https://maps.app.goo.gl/Bbj9wKXzQn5HWUP37" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                    >
                      <span className="mr-1">View on Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Care and Cure Agro Solutions</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      Chellarcovil, Anakkara, Kerala 685512
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">+91 9562855172</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">carecuresolutions@gmail.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">Mon–Sat: 8:00 AM – 6:30 PM</p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50" onClick={() => setGalleryBranch({title: "Care and Cure Agro Solutions", images: [b1_1,b1_2,b1_3,b1_4,b1_5,b1_6,b1_7,b1_8]})}>View Gallery</Button>
                    <a 
                      href="https://maps.app.goo.gl/QBf8dsf9CUSz3pyA9?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                    >
                      <span className="mr-1">View on Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Care and Cure Agri Clinic</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      Viswanathapuram, Murukkady, Periyar, Kerala 685535
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">+91 9003791922</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">carecureagriclinic@gmail.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">Mon–Sat: 8.30 AM – 6:00 PM</p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50" onClick={() => setGalleryBranch({title: "Care and Cure Agri Clinic", images: [b2_1,b2_2,b2_3,b2_4,b2_5,b2_6,b2_7,b2_8,b2_9,b2_10]})}>View Gallery</Button>
                    <a 
                      href="https://maps.app.goo.gl/Dohw9pyLAArmRC6r8?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                    >
                      <span className="mr-1">View on Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Care and Cure Agro Solutions</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      SH41, Labbakada Thoppipala, Kanchiyar, Kerala 685511
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">+91 9446610527</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">carecuresolutions@gmail.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 text-sm sm:text-base">Mon–Sat: 8:30 AM – 6:30 PM</p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50" onClick={() => setGalleryBranch({title: "Care and Cure Agro Solutions", images: [b3_1,b3_2,b3_3,b3_4,b3_5,b3_6]})}>View Gallery</Button>
                    <a 
                      href="https://maps.app.goo.gl/SH7dmBAJaRNxwqtg9?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                    >
                      <span className="mr-1">View on Map</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section id="vendors" className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="bg-pattern-light absolute inset-0 opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">Our Trusted Vendors</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              We partner with industry-leading suppliers to ensure the highest quality products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <TooltipProvider>
              {[
                { name: "RALLIS INDIA LIMITED", logo: rallisLogo },
                { name: "GITAJI PESTICIDES INDUSTRIES", logo: gitajiLogo },
                { name: "KR LIFESCIENCES PVT.LTD", logo: krLogo },
                { name: "TROPICAL AGROSYSTEM INDIA PVT. LTD.", logo: tropicalLogo },
                { name: "MEENAKSHI AGRO CHEMICALS", logo: meenakshiLogo },
                { name: "SUMUKHA FARM PRODUCTS PVT LTD", logo: sumukhaLogo },
                { name: "GROWGROUP CHEMICALS INDIA PVT LTD", logo: growgroupLogo },
                { name: "PARUAT INDUSTRIES INDIA PVT.LTD", logo: paruatLogo },
                { name: "ICON CROP SCIENCE", logo: iconLogo }
              ].map((vendor, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="p-4 sm:p-6 text-center flex items-center justify-center min-h-[100px]">
                        <img 
                          src={vendor.logo} 
                          alt={vendor.name} 
                          className="h-12 sm:h-16 object-contain"
                        />
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{vendor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-dots bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={contactAnimation.ref} className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${contactAnimation.isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-[10px]'}`}>            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">Get In Touch</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Ready to boost your crop yields? Contact us today!</p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${contactAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'}`}>            
            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:col-span-2 lg:col-span-1">              
              <CardContent className="p-6 sm:p-8 text-center">                
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">                  
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />                
                </div>                
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Call Us</h3>                
                <p className="text-gray-600 text-sm sm:text-base">+91 8072 433016</p>              
              </CardContent>            
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">              
              <CardContent className="p-6 sm:p-8 text-center">                
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">                  
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />                
                </div>                
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Email Us</h3>                
                <p className="text-gray-600 text-sm sm:text-base">careandcureagro@gmail.com</p>              
              </CardContent>            
            </Card>

            <Card className="border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:col-span-2 lg:col-span-1">              
              <CardContent className="p-6 sm:p-8 text-center">                
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">                  
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />                
                </div>                
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Visit Us</h3>                
                <p className="text-gray-600 text-sm sm:text-base">W-12/ D.NO.45B, Thottiyar Kaliyamman Kovil St,</p>                
                <p className="text-gray-600 text-sm sm:text-base">Gudalur, Theni, Tamil Nadu</p>              
              </CardContent>            
            </Card>          
          </div>        
        </div>      
      </section>

      {/* Footer */}
      <footer className="footer-gradient text-white py-8 sm:py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <img src={companyLogo} alt="Care & Cure Logo" className="h-8 sm:h-10 w-auto object-contain bg-white rounded-full p-0.5" />
                <span className="text-lg sm:text-xl font-bold">Care & Cure Groups</span>
              </div>
              <p className="text-green-200 text-sm sm:text-base">
                Empowering farmers with premium fertilizers for sustainable agriculture.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Home</a>
                <a href="#about" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">About</a>
                <a href="#services" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Services</a>
                <a href="#mission" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Mission</a>
                <a href="#team" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Team</a>
                <a href="#branches" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Branches</a>
                <a href="#vendors" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Vendors</a>
                <a href="#contact" className="block text-green-200 hover:text-white transition-colors text-sm sm:text-base">Contact</a>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold">Products</h4>
              <div className="space-y-2">
                <p className="text-green-200 text-sm sm:text-base">Organic Fertilizers</p>
                <p className="text-green-200 text-sm sm:text-base">NPK Fertilizers</p>
                <p className="text-green-200 text-sm sm:text-base">Micronutrient Solutions</p>
                <p className="text-green-200 text-sm sm:text-base">Soil Conditioners</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold">Contact Info</h4>
              <div className="space-y-2">
                <p className="text-green-200 text-sm sm:text-base">+91 8072 433016</p>
                <p className="text-green-200 text-sm sm:text-base">careandcureagro@gmail.com</p>
                <p className="text-green-200 text-sm sm:text-base">Gudalur, Theni, Tamil Nadu</p>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-green-200 text-sm sm:text-base">
              © 2025 Care and Cure Agro Trading Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 w-[calc(100vw-1rem)] max-w-80 h-80 sm:h-96 bg-white rounded-lg shadow-2xl border border-green-200 z-50 flex flex-col animate-scale-in">
          <div className="bg-green-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-sm sm:text-base">Chat with us</h3>
            <button onClick={() => setIsChatOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-xs sm:text-sm ${
                    msg.sender === "bot" ? "bg-green-50 text-green-800" : "bg-green-600 text-white self-end"
                  }`}
                >
                  {msg.text}
              </div>
              ))}
            </div>
          </div>
          <div className="p-3 sm:p-4 border-t border-green-100">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 border border-green-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button size="sm" onClick={sendMessage} className="bg-green-600 hover:bg-green-700 text-xs px-3 py-2">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-3 sm:bottom-4 right-3 sm:right-4 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl z-40"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <Dialog open={!!galleryBranch} onOpenChange={() => setGalleryBranch(null)}>
        <DialogContent className="w-full md:max-w-5xl p-0 bg-transparent shadow-none border-none">
          {galleryBranch && (
            <Carousel className="relative w-full" setApi={setCarouselApi} opts={{ loop: true }}>
              <CarouselContent>
                {galleryBranch.images.map((img, idx) => (
                  <CarouselItem key={idx} className="flex items-center justify-center">
                    <img src={img} alt={`${galleryBranch.title} ${idx+1}`} className="w-full h-96 md:h-[70vh] object-contain" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/80 hover:bg-white text-green-700 border-none" />
              <CarouselNext className="bg-white/80 hover:bg-white text-green-700 border-none" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
