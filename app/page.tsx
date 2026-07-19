import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { LayerNav } from "@/components/demo/layer-nav";
import { Layer01Hero } from "@/components/demo/layer-01-hero";
import { Layer02DepthZoom } from "@/components/demo/layer-02-depth-zoom";
import { Layer03OpposingText } from "@/components/demo/layer-03-opposing-text";
import { Layer04StickyStack } from "@/components/demo/layer-04-sticky-stack";
import { Layer05Horizontal } from "@/components/demo/layer-05-horizontal";
import { Layer06Rotate } from "@/components/demo/layer-06-rotate";
import { Layer07Exploded } from "@/components/demo/layer-07-exploded";
import { Layer08Velocity } from "@/components/demo/layer-08-velocity";
import { Layer09CircleReveal } from "@/components/demo/layer-09-circle-reveal";
import { Layer10Perspective } from "@/components/demo/layer-10-perspective";
import { Layer11Grid } from "@/components/demo/layer-11-grid";
import { Layer12CanvasScrub } from "@/components/demo/layer-12-canvas-scrub";
import { Layer13LineDraw } from "@/components/demo/layer-13-line-draw";
import { Layer14TextStagger } from "@/components/demo/layer-14-text-stagger";
import { Layer15ColorMorph } from "@/components/demo/layer-15-color-morph";
import { Layer16MouseParallax } from "@/components/demo/layer-16-mouse-parallax";
import { Layer17Progress } from "@/components/demo/layer-17-progress";
import { Layer18FooterReveal } from "@/components/demo/layer-18-footer-reveal";

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <LayerNav />
      <main>
        <Layer01Hero />
        <Layer02DepthZoom />
        <Layer03OpposingText />
        <Layer04StickyStack />
        <Layer05Horizontal />
        <Layer06Rotate />
        <Layer07Exploded />
        <Layer08Velocity />
        <Layer09CircleReveal />
        <Layer10Perspective />
        <Layer11Grid />
        <Layer12CanvasScrub />
        <Layer13LineDraw />
        <Layer14TextStagger />
        <Layer15ColorMorph />
        <Layer16MouseParallax />
        <Layer17Progress />
        <Layer18FooterReveal />
      </main>
    </SmoothScroll>
  );
}
