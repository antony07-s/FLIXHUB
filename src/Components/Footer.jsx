import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-8 text-gray-500">
      FlixHub © {year}
    </footer>
  );
}

export default Footer;