const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                Tax
              </div>
              <span className="text-2xl font-bold text-blue-900 tracking-tight">
                TAX
              </span>
              <span className="text-blue-900">services</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              The all-in-one compliance platform for international entrepreneurs
              building in the United States.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Incorporation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tax Filing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Bookkeeping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Partner Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center md:flex md:justify-between md:text-left">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} CorpPath. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs max-w-2xl">
            This website is for informational purposes only and does not
            constitute legal or tax advice. We are a private service provider,
            not a government agency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
