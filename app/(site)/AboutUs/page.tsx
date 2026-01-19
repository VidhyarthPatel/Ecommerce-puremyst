import Image from "next/image";
import AboutIMG from "@/assets/aboutIMG.png";

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-900 pt-20 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl mb-6">
            About PureMyst
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Delivering confidence in every drop with cleaner, safer, and better-quality water solutions.
          </p>
        </div>

        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative aspect-[4/3] w-full bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={AboutIMG}
              alt="PureMyst Water Solutions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-900">Who We Are</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                PureMyst is a water solutions brand dedicated to bringing cleaner, safer, and better-quality water into everyday homes. We specialize in designing and supplying innovative water purifiers, appliance water filters, and whole-home filtration solutions that protect health, enhance lifestyle, and extend the life of household appliances.
              </p>
              <p>
                At PureMyst, we believe water should not only be safe to drink, but also safe for bathing, washing, and cooking. That’s why our product range covers everything from non-electric purifiers and RO systems to washing machine filters, tap filters, shower filters, and whole-house solutions — all built with a focus on performance, affordability, and long-term reliability.
              </p>
              <p>
                Every PureMyst product is developed with careful filtration design, quality materials, and real Indian water conditions in mind. Our goal is simple: to make advanced water filtration accessible to every home.
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-gray-50 rounded-3xl p-10 lg:p-16 text-center mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed italic mb-8">
              "To become a most trusted water filtration brand, known for improving everyday life through pure water, smart design, and honest quality."
            </p>
            <p className="text-gray-600">
              We envision a future where every home has access to water that is not just clear, but truly clean — water that supports better health, protects appliances, and promotes a more sustainable way of living.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900">Our Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Effective Solutions",
                desc: "Provide effective, affordable, and reliable water filtration solutions.",
              },
              {
                title: "Real Challenges",
                desc: "Design products suited for real household water challenges.",
              },
              {
                title: "Sustainability",
                desc: "Reduce dependency on expensive, high-wastage systems wherever possible.",
              },
              {
                title: "Awareness",
                desc: "Promote water awareness, conservation, and smarter purification choices.",
              },
              {
                title: "Trust & Quality",
                desc: "Build long-term customer trust through quality, transparency, and service.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center border-t border-gray-100 pt-16">
          <p className="text-xl text-gray-900 font-medium">
            At PureMyst, we don’t just sell water filters — we work to deliver confidence in every drop.
          </p>
        </div>

      </div>
    </div>
  );
}