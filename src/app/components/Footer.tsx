const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Playwright Practice. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;