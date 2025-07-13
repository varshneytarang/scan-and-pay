import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scan,
  ShoppingCart,
  Smartphone,
  Zap,
  CheckCircle,
  ArrowRight,
  Timer,
  Shield,
  Star,
  Play,
} from "lucide-react";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate=useNavigate();

  const steps = [
    {
      icon: Scan,
      title: "Scan Items",
      description: "Simply scan product barcodes as you shop",
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Items are automatically added to your digital cart",
    },
    {
      icon: CheckCircle,
      title: "Pay & Go",
      description: "Complete payment instantly and walk out",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <Scan className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent mb-6 animate-fade-in">
              Scan & Go
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
              Revolutionary shopping experience that eliminates checkout lines
              forever
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button onClick={()=>navigate("/auth")} className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold text-lg hover:border-blue-500 hover:bg-primary hover:text-blue-500 transition-all duration-300">
                Try Now
              </button>
            </div>
          </div>

          {/* Animated Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Screen Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg">QuickShop</h3>
                    </div>

                    {/* Scanning Animation */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                      <div className="relative h-32 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform transition-transform duration-2000 ${isAnimating ? "translate-x-full" : "-translate-x-full"}`}
                        ></div>
                        <Scan className="w-12 h-12 text-blue-600 z-10" />
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Scanning product...
                      </p>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-2">
                      <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Organic Apples</p>
                          <p className="text-xs text-muted-foreground">$4.99</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Whole Milk</p>
                          <p className="text-xs text-muted-foreground">$3.49</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to revolutionize your shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;

              return (
                <div
                  key={index}
                  className={`text-center p-8 rounded-3xl transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-blue-50 to-cyan-50 scale-105 shadow-xl"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg scale-110"
                        : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      className={`w-10 h-10 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-500 ${
                          isActive
                            ? "bg-blue-600 text-white scale-110"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Why Choose Scan & Go?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Save Time
                    </h3>
                    <p className="text-muted-foreground">
                      Skip long checkout lines and save up to 15 minutes per
                      shopping trip
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Secure Payment
                    </h3>
                    <p className="text-muted-foreground">
                      Bank-level encryption ensures your payment information is
                      always safe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Easy to Use
                    </h3>
                    <p className="text-muted-foreground">
                      Intuitive interface works seamlessly with any smartphone
                      camera
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Star className="w-4 h-4" />
                    Customer Favorite
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Join 1M+ Happy Shoppers
                  </h3>
                  <p className="text-muted-foreground">
                    Experience the future of retail shopping today
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-muted-foreground">
                      Faster Checkout
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      4.9★
                    </div>
                    <div className="text-sm text-muted-foreground">
                      User Rating
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      1M+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who have already discovered the
            future of shopping
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
              <Smartphone className="w-5 h-5" />
              Download App
            </button>

            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}