const imageSrc = `${process.env["NEXTAUTH_URL"]}/public_bg/sunset.jpg`;

export function BackgroundImage() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-[100]">
      <div className="relative w-full h-full overflow-hidden">
        {/* Rotating Image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        ></div>

        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/50"></div>
      </div>
    </div>
  );
}
