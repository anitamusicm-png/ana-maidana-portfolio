export function SketchfabEmbed() {
  return (
    <div className="sketchfab-embed-wrapper w-full max-w-[220px] aspect-square md:ml-auto">
      <iframe
        title="Bluetooth Headphones"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        {...{
          "execution-while-out-of-viewport": "",
          "execution-while-not-rendered": "",
          "web-share": "",
        }}
        src="https://sketchfab.com/models/e1584a5d42bf47599a37e8fa39375d80/embed?autospin=1&autostart=1&transparent=1&ui_infos=0&ui_controls=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0"
      />
    </div>
  );
}
