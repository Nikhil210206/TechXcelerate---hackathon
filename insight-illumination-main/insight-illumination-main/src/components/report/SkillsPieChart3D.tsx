
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SkillsPieChart3DProps {
  skills: {
    name: string;
    value: number;
    color: string;
  }[];
}

const SkillsPieChart3D: React.FC<SkillsPieChart3DProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pieChartRef = useRef<THREE.Group | null>(null);
  const isUserInteracting = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create pie chart group
    const pieChart = new THREE.Group();
    pieChartRef.current = pieChart;
    scene.add(pieChart);
    
    // Create pie chart segments
    createPieChart();
    
    // Add tooltips container
    const tooltipsContainer = document.createElement('div');
    tooltipsContainer.className = 'absolute inset-0 pointer-events-none';
    containerRef.current.appendChild(tooltipsContainer);
    
    // Add event listeners for interaction
    containerRef.current.addEventListener('mousedown', onMouseDown);
    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('mouseleave', onMouseUp);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (pieChartRef.current && !isUserInteracting.current) {
        pieChartRef.current.rotation.y += 0.005; // Slow automatic rotation
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', onMouseDown);
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('mouseup', onMouseUp);
        containerRef.current.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, [skills]);
  
  // Create pie chart segments
  const createPieChart = () => {
    if (!pieChartRef.current) return;
    
    // Clear existing segments
    while (pieChartRef.current.children.length > 0) {
      pieChartRef.current.remove(pieChartRef.current.children[0]);
    }
    
    // Calculate total value for percentages
    const totalValue = skills.reduce((sum, skill) => sum + skill.value, 0);
    
    // Create segments
    let startAngle = 0;
    const radius = 1.5;
    const height = 0.3;
    
    skills.forEach((skill) => {
      const angle = (skill.value / totalValue) * Math.PI * 2;
      const endAngle = startAngle + angle;
      
      // Create segment
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
      
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        startAngle, endAngle,
        false, 0
      );
      
      const points = curve.getPoints(32);
      shape.setFromPoints(points);
      shape.lineTo(0, 0);
      
      const extrudeSettings = {
        steps: 1,
        depth: height,
        bevelEnabled: false
      };
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({
        color: skill.color,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      
      const segment = new THREE.Mesh(geometry, material);
      segment.userData = { skill: skill.name, value: skill.value };
      segment.rotation.x = -Math.PI / 2; // Rotate to horizontal plane
      
      pieChartRef.current.add(segment);
      
      startAngle = endAngle;
    });
  };
  
  // Mouse interaction handlers
  const previousMousePosition = { x: 0, y: 0 };
  
  const onMouseDown = (event: MouseEvent) => {
    isUserInteracting.current = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
  };
  
  const onMouseMove = (event: MouseEvent) => {
    if (!isUserInteracting.current || !pieChartRef.current) return;
    
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };
    
    pieChartRef.current.rotation.y += deltaMove.x * 0.01;
    pieChartRef.current.rotation.x += deltaMove.y * 0.01;
    
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
  };
  
  const onMouseUp = () => {
    isUserInteracting.current = false;
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-2 left-2 bg-black/10 text-xs px-2 py-1 rounded backdrop-blur-sm text-white">
        Click and drag to rotate
      </div>
    </div>
  );
};

export default SkillsPieChart3D;
