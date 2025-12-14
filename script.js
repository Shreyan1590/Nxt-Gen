/**
 * ==========================================
 * 🎨 NXT-GEN COMPUTING - REACT APPLICATION
 * Cuberto Light Theme - Enhanced Version
 * ==========================================
 */

const {
    useState,
    useEffect,
    useRef,
    useCallback,
    createContext,
    useContext
} = React;

// ==========================================
// GSAP & LENIS INITIALIZATION
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Global Lenis instance
let lenis = null;

// ==========================================
// ICON COMPONENTS (SVG-based, no emojis)
// ==========================================
const Icon = ({
    name,
    size = 24,
    className = ''
}) => {
    const icons = {
        // About Section Icons
        graduationCap: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M22 10v6M2 10l10-5 10 5-10 5z" / >
            <
            path d = "M6 12v5c3 3 9 3 12 0v-5" / >
            <
            /svg>
        ),
        briefcase: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            rect x = "2"
            y = "7"
            width = "20"
            height = "14"
            rx = "2"
            ry = "2" / >
            <
            path d = "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" / >
            <
            /svg>
        ),
        flask: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >

            <
            path d = "M9 3h6M10 9V3M14 9V3" / >

            <
            path d = "M10 9l-4.5 9.5c-.7 1.4.4 3 2 3h9c1.6 0 2.7-1.6 2-3L14 9" / >

            <
            path d = "M7 17h10" / >
            <
            /svg>
        ),
        building: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >

            <
            path d = "M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" / >

            <
            path d = "M9 9v.01M9 12v.01M9 15v.01M9 18v.01" / >
            <
            /svg>
        ),
        // Vision & Mission Icons
        globe: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            circle cx = "12"
            cy = "12"
            r = "10" / >
            <
            line x1 = "2"
            y1 = "12"
            x2 = "22"
            y2 = "12" / >
            <
            path d = "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" / >
            <
            /svg>
        ),
        rocket: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" / >
            <
            path d = "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" / >
            <
            path d = "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" / >
            <
            path d = "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" / >
            <
            /svg>
        ),
        // Achievements Icons
        trophy: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" / >
            <
            path d = "M4 22h16" / >
            <
            path d = "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" / >
            <
            path d = "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" / >
            <
            path d = "M18 2H6v7a6 6 0 0 0 12 0V2Z" / >
            <
            /svg>
        ),
        star: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            polygon points = "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" / >
            <
            /svg>
        ),
        bookOpen: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" / >
            <
            path d = "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" / >
            <
            /svg>
        ),
        handshake: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M11 17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9h3" / >
            <
            path d = "M22 9v8a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-1" / >
            <
            path d = "M8 4v4" / >
            <
            path d = "M16 4v4" / >
            <
            path d = "M2 9h20" / >
            <
            path d = "m14 14-2-2 2-2" / >
            <
            path d = "m10 10 2 2-2 2" / >
            <
            /svg>
        ),
        // Contact Icons
        mail: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            rect x = "2"
            y = "4"
            width = "20"
            height = "16"
            rx = "2" / >
            <
            path d = "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" / >
            <
            /svg>
        ),
        phone: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" / >
            <
            /svg>
        ),
        mapPin: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" / >
            circle cx = "12"
            cy = "10"
            r = "3" / >
            <
            /svg>
        ),
        // Chat Icons
        messageCircle: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            path d = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" / >
            <
            /svg>
        ),
        x: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            line x1 = "18"
            y1 = "6"
            x2 = "6"
            y2 = "18" / >
            line x1 = "6"
            y1 = "6"
            x2 = "18"
            y2 = "18" / >
            <
            /svg>
        ),
        send: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            line x1 = "22"
            y1 = "2"
            x2 = "11"
            y2 = "13" / >
            <
            polygon points = "22 2 15 22 11 13 2 9 22 2" / >
            <
            /svg>
        ),
        bot: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            rect x = "3"
            y = "11"
            width = "18"
            height = "10"
            rx = "2" / >
            circle cx = "12"
            cy = "5"
            r = "2" / >
            <
            path d = "M12 7v4" / >
            line x1 = "8"
            y1 = "16"
            x2 = "8"
            y2 = "16" / >
            line x1 = "16"
            y1 = "16"
            x2 = "16"
            y2 = "16" / >
            <
            /svg>
        ),
        check: ( <
            svg viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "2"
            strokeLinecap = "round"
            strokeLinejoin = "round" >
            <
            polyline points = "20 6 9 17 4 12" / >
            <
            /svg>
        )
    };

    return ( <
        span className = {
            `icon ${className}`
        }
        style = {
            {
                width: size,
                height: size,
                display: 'inline-flex'
            }
        } > {
            icons[name] || null
        } <
        /span>
    );
};

// ==========================================
// REACT COMPONENTS
// ==========================================

// Orb Component - WebGL Animated Orb (ReactBits inspired)
const Orb = ({
    hue = 0,
    hoverIntensity = 0.2,
    rotateOnHover = true,
    forceHoverState = false
}) => {
    const ctnDom = useRef(null);

    const vert = `
        precision highp float;
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const frag = `
        precision highp float;
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float hue;
        uniform float hover;
        uniform float rot;
        uniform float hoverIntensity;
        varying vec2 vUv;

        vec3 rgb2yiq(vec3 c) {
            float y = dot(c, vec3(0.299, 0.587, 0.114));
            float i = dot(c, vec3(0.596, -0.274, -0.322));
            float q = dot(c, vec3(0.211, -0.523, 0.312));
            return vec3(y, i, q);
        }
        
        vec3 yiq2rgb(vec3 c) {
            float r = c.x + 0.956 * c.y + 0.621 * c.z;
            float g = c.x - 0.272 * c.y - 0.647 * c.z;
            float b = c.x - 1.106 * c.y + 1.703 * c.z;
            return vec3(r, g, b);
        }
        
        vec3 adjustHue(vec3 color, float hueDeg) {
            float hueRad = hueDeg * 3.14159265 / 180.0;
            vec3 yiq = rgb2yiq(color);
            float cosA = cos(hueRad);
            float sinA = sin(hueRad);
            float i = yiq.y * cosA - yiq.z * sinA;
            float q = yiq.y * sinA + yiq.z * cosA;
            yiq.y = i;
            yiq.z = q;
            return yiq2rgb(yiq);
        }

        vec3 hash33(vec3 p3) {
            p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
            p3 += dot(p3, p3.yxz + 19.19);
            return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
        }

        float snoise3(vec3 p) {
            const float K1 = 0.333333333;
            const float K2 = 0.166666667;
            vec3 i = floor(p + (p.x + p.y + p.z) * K1);
            vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
            vec3 e = step(vec3(0.0), d0 - d0.yzx);
            vec3 i1 = e * (1.0 - e.zxy);
            vec3 i2 = 1.0 - e.zxy * (1.0 - e);
            vec3 d1 = d0 - (i1 - K2);
            vec3 d2 = d0 - (i2 - K1);
            vec3 d3 = d0 - 0.5;
            vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
            vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
            return dot(vec4(31.316), n);
        }

        vec4 extractAlpha(vec3 colorIn) {
            float a = max(max(colorIn.r, colorIn.g), colorIn.b);
            return vec4(colorIn.rgb / (a + 1e-5), a);
        }

        const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
        const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
        const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
        const float innerRadius = 0.6;
        const float noiseScale = 0.65;

        float light1(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * attenuation);
        }
        float light2(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * dist * attenuation);
        }

        vec4 draw(vec2 uv) {
            vec3 color1 = adjustHue(baseColor1, hue);
            vec3 color2 = adjustHue(baseColor2, hue);
            vec3 color3 = adjustHue(baseColor3, hue);
            
            float ang = atan(uv.y, uv.x);
            float len = length(uv);
            float invLen = len > 0.0 ? 1.0 / len : 0.0;
            
            float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
            float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
            float d0 = distance(uv, (r0 * invLen) * uv);
            float v0 = light1(1.0, 10.0, d0);
            v0 *= smoothstep(r0 * 1.05, r0, len);
            float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
            
            float a = iTime * -1.0;
            vec2 pos = vec2(cos(a), sin(a)) * r0;
            float d = distance(uv, pos);
            float v1 = light2(1.5, 5.0, d);
            v1 *= light1(1.0, 50.0, d0);
            
            float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
            float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
            
            vec3 col = mix(color1, color2, cl);
            col = mix(color3, col, v0);
            col = (col + v1) * v2 * v3;
            col = clamp(col, 0.0, 1.0);
            
            return extractAlpha(col);
        }

        vec4 mainImage(vec2 fragCoord) {
            vec2 center = iResolution.xy * 0.5;
            float size = min(iResolution.x, iResolution.y);
            vec2 uv = (fragCoord - center) / size * 2.0;
            
            float angle = rot;
            float s = sin(angle);
            float c = cos(angle);
            uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
            
            uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
            uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
            
            return draw(uv);
        }

        void main() {
            vec2 fragCoord = vUv * iResolution.xy;
            vec4 col = mainImage(fragCoord);
            gl_FragColor = vec4(col.rgb * col.a, col.a);
        }
    `;

    useEffect(() => {
        const container = ctnDom.current;
        if (!container || typeof OGL === 'undefined') return;

        const {
            Renderer,
            Program,
            Mesh,
            Triangle,
            Vec3
        } = OGL;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: false
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vert,
            fragment: frag,
            uniforms: {
                iTime: {
                    value: 0
                },
                iResolution: {
                    value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                hue: {
                    value: hue
                },
                hover: {
                    value: 0
                },
                rot: {
                    value: 0
                },
                hoverIntensity: {
                    value: hoverIntensity
                }
            }
        });

        const mesh = new Mesh(gl, {
            geometry,
            program
        });

        function resize() {
            if (!container) return;
            const dpr = window.devicePixelRatio || 1;
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width * dpr, height * dpr);
            gl.canvas.style.width = width + 'px';
            gl.canvas.style.height = height + 'px';
            program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        let targetHover = 0;
        let lastTime = 0;
        let currentRot = 0;
        const rotationSpeed = 0.3;

        const handleMouseMove = e => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;
            const size = Math.min(width, height);
            const centerX = width / 2;
            const centerY = height / 2;
            const uvX = ((x - centerX) / size) * 2.0;
            const uvY = ((y - centerY) / size) * 2.0;

            if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
                targetHover = 1;
            } else {
                targetHover = 0;
            }
        };

        const handleMouseLeave = () => {
            targetHover = 0;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        let rafId;
        const update = t => {
            rafId = requestAnimationFrame(update);
            const dt = (t - lastTime) * 0.001;
            lastTime = t;
            program.uniforms.iTime.value = t * 0.001;
            program.uniforms.hue.value = hue;
            program.uniforms.hoverIntensity.value = hoverIntensity;

            const effectiveHover = forceHoverState ? 1 : targetHover;
            program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

            if (rotateOnHover && effectiveHover > 0.5) {
                currentRot += dt * rotationSpeed;
            }
            program.uniforms.rot.value = currentRot;

            renderer.render({
                scene: mesh
            });
        };
        rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (gl.canvas.parentNode) container.removeChild(gl.canvas);
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
        };
    }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

    return <div ref={ctnDom}
    className="orb-container" />;
};

// Threads Component - WebGL Flowing Lines (ReactBits inspired)
const Threads = ({
    color = [1, 1, 1],
    amplitude = 1,
    distance = 0,
    enableMouseInteraction = false,
    ...rest
}) => {
    const containerRef = useRef(null);
    const animationFrameId = useRef();

    const vertexShader = `
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;

varying vec2 vUv;
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec3 uColor;
        uniform float uAmplitude;
        uniform float uDistance;
        uniform vec2 uMouse;

        #define PI 3.1415926538

        const int u_line_count = 40;
        const float u_line_width = 7.0;
        const float u_line_blur = 10.0;

        float Perlin2D(vec2 P) {
            vec2 Pi = floor(P);
            vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
            vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
            Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
            Pt += vec2(26.0, 161.0).xyxy;
            Pt *= Pt;
            Pt = Pt.xzxz * Pt.yyww;
            vec4 hash_x = fract(Pt * (1.0 / 951.135664));
            vec4 hash_y = fract(Pt * (1.0 / 642.949883));
            vec4 grad_x = hash_x - 0.49999;
            vec4 grad_y = hash_y - 0.49999;
            vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
                * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
            grad_results *= 1.4142135623730950;
            vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
                       * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
            vec4 blend2 = vec4(blend, vec2(1.0 - blend));
            return dot(grad_results, blend2.zxzx * blend2.wwyy);
        }

        float pixel(float count, vec2 resolution) {
            return (1.0 / max(resolution.x, resolution.y)) * count;
        }

        float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
            float split_offset = (perc * 0.4);
            float split_point = 0.1 + split_offset;

            float amplitude_normal = smoothstep(split_point, 0.7, st.x);
            float amplitude_strength = 0.5;
            float finalAmplitude = amplitude_normal * amplitude_strength
                                   * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

            float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
            float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

            float xnoise = mix(
                Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
                Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
                st.x * 0.3
            );

            float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

            float line_start = smoothstep(
                y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
                y,
                st.y
            );

            float line_end = smoothstep(
                y,
                y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
                st.y
            );

            return clamp(
                (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
                0.0,
                1.0
            );
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            vec2 uv = fragCoord / iResolution.xy;

            float line_strength = 1.0;
            for (int i = 0; i < u_line_count; i++) {
                float p = float(i) / float(u_line_count);
                line_strength *= (1.0 - lineFn(
                    uv,
                    u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
                    p,
                    (PI * 1.0) * p,
                    uMouse,
                    iTime,
                    uAmplitude,
                    uDistance
                ));
            }

            float colorVal = 1.0 - line_strength;
            fragColor = vec4(uColor * colorVal, colorVal);
        }

        void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    mainImage(gl_FragColor, fragCoord);
        }
    `;

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const initWebGL = () => {
            if (typeof OGL === 'undefined') {
                setTimeout(initWebGL, 50);
                return null;
            }

            const {
                Renderer,
                Program,
                Mesh,
                Triangle,
                Color
            } = OGL;

            const renderer = new Renderer({
                alpha: true
            });
            const gl = renderer.gl;
            if (!gl) {
                console.warn('WebGL not supported');
                return null;
            }
            gl.clearColor(0, 0, 0, 0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            container.appendChild(gl.canvas);

            const geometry = new Triangle(gl);
            const program = new Program(gl, {
                vertex: vertexShader,
                fragment: fragmentShader,
                uniforms: {
                    iTime: {
                        value: 0
                    },
                    iResolution: {
                        value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                    },
                    uColor: {
                        value: new Color(...color)
                    },
                    uAmplitude: {
                        value: amplitude
                    },
                    uDistance: {
                        value: distance
                    },
                    uMouse: {
                        value: new Float32Array([0.5, 0.5])
                    }
                }
            });

            const mesh = new Mesh(gl, {
                geometry,
                program
            });

            function resize() {
                const {
                    clientWidth,
                    clientHeight
                } = container;
                if (clientWidth > 0 && clientHeight > 0) {
                    renderer.setSize(clientWidth, clientHeight);
                    program.uniforms.iResolution.value.r = clientWidth;
                    program.uniforms.iResolution.value.g = clientHeight;
                    program.uniforms.iResolution.value.b = clientWidth / clientHeight;
                }
            }
            window.addEventListener('resize', resize);

            setTimeout(() => resize(), 0);

            let currentMouse = [0.5, 0.5];
            let targetMouse = [0.5, 0.5];

            function handleMouseMove(e) {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1.0 - (e.clientY - rect.top) / rect.height;
                targetMouse = [x, y];
            }

            function handleMouseLeave() {
                targetMouse = [0.5, 0.5];
            }
            if (enableMouseInteraction) {
                container.addEventListener('mousemove', handleMouseMove);
                container.addEventListener('mouseleave', handleMouseLeave);
            }

            function update(t) {
                if (enableMouseInteraction) {
                    const smoothing = 0.05;
                    currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
                    currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
                    program.uniforms.uMouse.value[0] = currentMouse[0];
                    program.uniforms.uMouse.value[1] = currentMouse[1];
                } else {
                    program.uniforms.uMouse.value[0] = 0.5;
                    program.uniforms.uMouse.value[1] = 0.5;
                }
                program.uniforms.iTime.value = t * 0.001;

                renderer.render({
                    scene: mesh
                });
                animationFrameId.current = requestAnimationFrame(update);
            }
            animationFrameId.current = requestAnimationFrame(update);

            return () => {
                if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
                window.removeEventListener('resize', resize);

                if (enableMouseInteraction) {
                    container.removeEventListener('mousemove', handleMouseMove);
                    container.removeEventListener('mouseleave', handleMouseLeave);
                }
                if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
                const ext = gl.getExtension('WEBGL_lose_context');
                if (ext) ext.loseContext();
            };
        };

        let cleanup = null;
        const tryInit = () => {
            cleanup = initWebGL();
            if (!cleanup && typeof OGL === 'undefined') {
                setTimeout(tryInit, 50);
            }
        };
        tryInit();

        return () => {
            if (cleanup) cleanup();
        };
    }, [color, amplitude, distance, enableMouseInteraction]);

    return <div ref={containerRef}
    className="threads-container" {...rest} />;
};

// Cursor Component
const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorOuterRef = useRef(null);
    const cursorTextRef = useRef(null);
    const mousePos = useRef({
        x: 0,
        y: 0
    });
    const cursorPos = useRef({
        x: 0,
        y: 0
    });
    const cursorOuterPos = useRef({
        x: 0,
        y: 0
    });

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e) => {
            mousePos.current = {
                x: e.clientX,
                y: e.clientY
            };

            // Check if cursor is over dark/video sections for white cursor
            const darkSections = document.querySelectorAll('.immersive-section, .research-section-video');
            let isOverDarkSection = false;

            darkSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    isOverDarkSection = true;
                }
            });

            if (isOverDarkSection) {
                document.body.classList.add('cursor-white');
            } else {
                document.body.classList.remove('cursor-white');
            }
        };

        const animate = () => {
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

            cursorOuterPos.current.x += (mousePos.current.x - cursorOuterPos.current.x) * 0.08;
            cursorOuterPos.current.y += (mousePos.current.y - cursorOuterPos.current.y) * 0.08;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px)`;
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform = `translate(${cursorOuterPos.current.x - 20}px, ${cursorOuterPos.current.y - 20}px)`;
            }
            if (cursorTextRef.current) {
                cursorTextRef.current.style.transform = `translate(${cursorOuterPos.current.x}px, ${cursorOuterPos.current.y + 50}px) translate(-50%, 0)`;
            }

            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animate();

        // Hover effects - delay to ensure DOM is ready
        const setupHovers = () => {
            const hoverElements = document.querySelectorAll('a, button, .service-item, .featured-card, .team-card, .gallery-slide, input, textarea, [data-cursor]');

            // All cursor state classes
            const cursorClasses = ['cursor-hover', 'cursor-text-mode', 'cursor-pointer', 'cursor-opaque', 'cursor-inverse', 'cursor-exclusion', 'cursor-lg'];

            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');

                    const cursorType = el.dataset.cursor;
                    if (cursorType) {
                        // Handle Cuberto-style data-cursor values (e.g., "-pointer", "-inverse", "view", "explore")
                        if (cursorType.startsWith('-')) {
                            // Direct cursor state class (e.g., "-pointer" -> "cursor-pointer")
                            const stateClass = `cursor${cursorType}`.replace('-', '-');
                            if (cursorType === '-pointer') document.body.classList.add('cursor-pointer');
                            if (cursorType === '-opaque') document.body.classList.add('cursor-opaque');
                            if (cursorType === '-inverse') document.body.classList.add('cursor-inverse');
                            if (cursorType === '-exclusion') document.body.classList.add('cursor-exclusion');
                            if (cursorType === '-lg') document.body.classList.add('cursor-lg');
                        } else {
                            // Text cursor (e.g., "view", "explore")
                            if (cursorTextRef.current) {
                                cursorTextRef.current.textContent = cursorType.charAt(0).toUpperCase() + cursorType.slice(1);
                                document.body.classList.add('cursor-text-mode');
                            }
                        }
                    }
                });

                el.addEventListener('mouseleave', () => {
                    cursorClasses.forEach(cls => document.body.classList.remove(cls));
                });
            });
        };

        setTimeout(setupHovers, 500);

        document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
        document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
        <div className="cb-cursor"
        ref={cursorRef}>
        <div className="cb-cursor-inner"></div>
        </div>
        <div className="cb-cursor-outer"
        ref={cursorOuterRef}></div>
        <div className="cb-cursor-text"
        ref={cursorTextRef}>View</div>
        </>
    );
};

// Preloader Component
const Preloader = ({
    onComplete
}) => {
    const [loaded, setLoaded] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                const next = prev + Math.floor(Math.random() * 15) + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setLoaded(true);
                        setTimeout(onComplete, 800);
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`preloader ${loaded ? 'loaded' : ''}`}>
        <div className="preloader-content">
        <div className="preloader-text">
        <span>Nxt-Gen Computing</span>
        </div>
        <div className="preloader-counter">{count}%</div>
        <div className="preloader-bar">
        <div className="preloader-bar-fill"
        style={{
            width: `${count}%`
        }}></div>
        </div>
        </div>
        </div>
    );
};

// Scroll Progress Component
const ScrollProgress = () => {
    const progressRef = useRef(null);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / scrollHeight;
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return <div className="scroll-progress"
    ref={progressRef}></div>;
};

// Navigation Component
const Navbar = ({ scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    // sectionId should be 'home', 'about', etc. (no #)
    scrollToSection(sectionId);
  };
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a
        href="#home"
        className="nav-logo"
        onClick={(e) => handleNavClick(e, 'home')}
      >
        Nxt-Gen Computing
      </a>
  
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li key="nav-about">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            <span className="nav-link-title">
              <span data-text="About">About</span>
            </span>
          </a>
        </li>
        <li key="nav-vision">
          <a href="#vision" onClick={(e) => handleNavClick(e, 'vision')}>
            <span className="nav-link-title">
              <span data-text="Vision">Vision</span>
            </span>
          </a>
        </li>
        <li key="nav-research">
          <a href="#research" onClick={(e) => handleNavClick(e, 'research')}>
            <span className="nav-link-title">
              <span data-text="Research">Research</span>
            </span>
          </a>
        </li>
        <li key="nav-faculty">
          <a href="#faculty" onClick={(e) => handleNavClick(e, 'faculty')}>
            <span className="nav-link-title">
              <span data-text="Faculty">Faculty</span>
            </span>
          </a>
        </li>
        <li key="nav-gallery">
          <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>
            <span className="nav-link-title">
              <span data-text="Gallery">Gallery</span>
            </span>
          </a>
        </li>
        <li key="nav-events">
          <a href="#events" onClick={(e) => handleNavClick(e, 'events')}>
            <span className="nav-link-title">
              <span data-text="Events">Events</span>
            </span>
          </a>
        </li>
      </ul>
  
      <a
        href="#contact"
        className="nav-contact"
        onClick={(e) => handleNavClick(e, 'contact')}
      >
        Contact Us
      </a>
  
      <button
        className="nav-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};
  

// Event Marquee Component - Fixed below navbar, shows upcoming events
const EventMarquee = ({
    scrollToSection
}) => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('events.json');
                const events = await response.json();
                updateUpcomingEvent(events);
            } catch (error) {
                console.log('No events data available');
            }
        };

        const updateUpcomingEvent = (events) => {
            const now = new Date();
            // Filter for upcoming or ongoing events (not finished yet)
            const upcoming = events
                .filter(event => new Date(event.eventEnd) > now)
                .sort((a, b) => new Date(a.eventStart) - new Date(b.eventStart));

            if (upcoming.length > 0) {
                setUpcomingEvent(upcoming[0]);
                setIsVisible(true);

                // Set timeout to update when current event ends
                const eventEndTime = new Date(upcoming[0].eventEnd);
                const timeUntilEnd = eventEndTime - now;

                if (timeUntilEnd > 0) {
                    setTimeout(() => {
                        updateUpcomingEvent(events);
                    }, timeUntilEnd);
                }
            } else {
                setUpcomingEvent(null);
                setIsVisible(false);
            }
        };

        fetchEvents();

        // Check for updates every minute
        const interval = setInterval(() => {
            fetchEvents();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        scrollToSection('events');
    };

    if (!isVisible || !upcomingEvent) return null;

    return ( <
        div className = "event-marquee"
        onClick = {
            handleClick
        } >
        <
        div className = "event-marquee-track" >
        <
        span className = "event-marquee-text" > 🎉Upcoming Event: {
            upcomingEvent.title
        }•
        Click to view details < /span> <
        span className = "event-marquee-text" > 🎉Upcoming Event: {
            upcomingEvent.title
        }•
        Click to view details < /span> < /
        div > <
        /div>
    );
};

// Section Header Component
const SectionHeader = ({
    title,
    subtitle,
    link,
    linkText
}) => {
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            gsap.from(headerRef.current.querySelector('.section-title'), {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'expo.out'
            });

            if (headerRef.current.querySelector('.section-subtitle')) {
                gsap.from(headerRef.current.querySelector('.section-subtitle'), {
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: 'expo.out'
                });
            }
        }
    }, []);

    return ( <
        div className = "section-header"
        ref = {
            headerRef
        } >
        <
        div className = "section-header-content" >
        <
        h2 className = "section-title" > {
            title
        } < /h2> {
        subtitle && < p className = "section-subtitle" > {
            subtitle
        } < /p>} < /
        div > {
            link && < a href = {
                link
            }
            className = "section-link" > {
                linkText || 'View all →'
            } < /a>} < /
            div >
        );
    };

    // Hero Section Component
    const Hero = ({ animated, scrollToSection }) => {
        const heroRef = useRef(null);
        const [isMobile, setIsMobile] = useState(false);
    
        useEffect(() => {
        if (animated && heroRef.current) {
            heroRef.current.classList.add('animated');
            const title = heroRef.current.querySelector('.hero-title');
            if (title) {
            setTimeout(() => {
                title.classList.add('animated');
            }, 100);
            }
    
            const cta = heroRef.current.querySelector('.hero-cta');
            if (cta) {
            const handleMove = (e) => {
                const rect = cta.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(cta, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
                });
            };
            const handleLeave = () => {
                gsap.to(cta, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
                });
            };
            cta.addEventListener('mousemove', handleMove);
            cta.addEventListener('mouseleave', handleLeave);
            return () => {
                cta.removeEventListener('mousemove', handleMove);
                cta.removeEventListener('mouseleave', handleLeave);
            };
            }
        }
        }, [animated]);
    
        const handleCTAClick = (e) => {
        e.preventDefault();
        scrollToSection('about');
        };
    
        useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
        }, []);
    
        return (
        <section className="hero hero-with-threads" id="home" ref={heroRef}>
            <div className="hero-threads-bg">
            <Threads
                color={[1, 1, 1]}
                amplitude={1}
                distance={1}
                enableMouseInteraction={!isMobile}
            />
            </div>
    
            <div className="hero-content">
            <div className="hero-label">
                <span>Department of Nxt-Gen Computing</span>
                <span className="hero-label-divider" />
                <span>SIMATS Engineering</span>
            </div>
    
            <h1 className="hero-title">
                <span className="line">
                <span className="word">Shaping</span>
                <span className="word">the</span>
                <span className="word">future</span>
                </span>
                <span className="line">
                <span className="word">of</span>
                <span className="word">technology</span>
                </span>
            </h1>
    
            <p className="hero-description">
                A pioneering department focused on AI, Machine Learning, Quantum Computing, and cutting-edge research.
                We transform students into future tech leaders through innovation and excellence.
            </p>
    
            <a
                href="#about"
                className="hero-cta"
                data-cursor="explore"
                onClick={handleCTAClick}
            >
                <span>Explore Department</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
                </svg>
            </a>
    
            <div className="hero-stats">
                <div className="stat-item">
                <div className="stat-number">10</div>
                <div className="stat-label">Expert Faculty</div>
                </div>
                <div className="stat-item">
                <div className="stat-number">500</div>
                <div className="stat-label">Students</div>
                </div>
                <div className="stat-item">
                <div className="stat-number">50</div>
                <div className="stat-label">Research Papers</div>
                </div>
            </div>
            </div>
        </section>
        );
    };

    // Marquee Component
    const Marquee = () => {
        const items = [
            'Artificial Intelligence',
            'Machine Learning',
            'Quantum Computing',
            'Deep Learning',
            'LLM Research',
            'Cyber Security'
        ];

        return ( <
            div className = "marquee-section" >
            <
            div className = "marquee" > {
                [0, 1].map(i => ( <
                    div className = "marquee-content"
                    key = {
                        i
                    } > {
                        items.map((item, j) => ( <
                            React.Fragment key = {
                                j
                            } >
                            <
                            span className = "marquee-item" > {
                                item
                            } < /span> <
                            span className = "marquee-divider" > < /span> < /
                            React.Fragment >
                        ))
                    } <
                    /div>
                ))
            } <
            /div> < /
            div >
        );
    };

    // Immersive Visual Component - Ultra Attractive Animations
    const ImmersiveVisual = () => {
        const sectionRef = useRef(null);
        const imagesRef = useRef([]);

        const images = [{
                src: 'images/Events/SIH2025.jpeg',
                title: 'Innovation Hub'
            },
            {
                src: 'images/Events/Dubai.jpg',
                title: 'Global Research'
            },
            {
                src: 'images/Events/CoyotechGroupPhoto.jpg',
                title: 'Industry Collaboration'
            },
            {
                src: 'images/SimatsEngineering.jpg',
                title: 'Campus'
            }
        ];

        useEffect(() => {
            if (sectionRef.current) {
                // Create immersive parallax effect
                gsap.fromTo(sectionRef.current.querySelector('.immersive-bg'), {
                    scale: 1.2
                }, {
                    scale: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });

                // Animate floating images with stagger
                imagesRef.current.forEach((img, i) => {
                    if (img) {
                        // Entry animation
                        gsap.from(img, {
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 80%'
                            },
                            y: 100 + i * 30,
                            x: i % 2 === 0 ? -50 : 50,
                            opacity: 0,
                            rotation: i % 2 === 0 ? -5 : 5,
                            scale: 0.8,
                            duration: 1.2,
                            delay: i * 0.15,
                            ease: 'expo.out'
                        });

                        // Parallax floating on scroll
                        gsap.to(img, {
                            y: -50 - i * 20,
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.5
                            }
                        });
                    }
                });

                // Animate the text
                gsap.from('.immersive-title', {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    },
                    y: 80,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'expo.out'
                });

                gsap.from('.immersive-desc', {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.2,
                    ease: 'expo.out'
                });
            }
        }, []);

        return ( <
            section className = "immersive-section"
            ref = {
                sectionRef
            } >
            <
            div className = "immersive-bg" >
            <
            div className = "immersive-gradient" > < /div> < /
            div >

            <
            div className = "immersive-content" >
            <
            div className = "immersive-text" >
            <
            h2 className = "immersive-title" > Where Innovation Meets Excellence < /h2> <
            p className = "immersive-desc" >
            Our department brings together world - class faculty, cutting - edge research, and ambitious students to push the boundaries of computing technology. <
            /p> < /
            div >

            <
            div className = "immersive-images" > {
                images.map((img, i) => ( <
                    div key = {
                        i
                    }
                    className = {
                        `immersive-float-img img-${i + 1}`
                    }
                    ref = {
                        el => imagesRef.current[i] = el
                    } >
                    <
                    img src = {
                        img.src
                    }
                    alt = {
                        img.title
                    }
                    loading = "lazy" / >
                    <
                    span className = "float-label" > {
                        img.title
                    } < /span> < /
                    div >
                ))
            } <
            /div> < /
            div >

            <
            div className = "immersive-particles" > {
                [...Array(20)].map((_, i) => ( <
                    span key = {
                        i
                    }
                    className = "particle"
                    style = {
                        {
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }
                    } > < /span>
                ))
            } <
            /div> < /
            section >
        );
    };


    // About Section Component with Background Video Animation
    const About = () => {
        const sectionRef = useRef(null);

        useEffect(() => {
            if (sectionRef.current) {
                // Text animation
                gsap.from(sectionRef.current.querySelector('.text-section-large'), {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'expo.out'
                });
            }
        }, []);

        return ( <
                section className = "section about-section-video"
                id = "about"
                ref = {
                    sectionRef
                } > {
                    /* Full-screen background video */
                } <
                div className = "about-video-bg" >
                <
                video className = "about-bg-video"
                autoPlay loop muted playsInline >
                <
                source src = "videos/about-animation.mp4"
                type = "video/mp4" / >
                <
                /video> <
                div className = "about-video-overlay" > < /div> < /
                div >

                {
                    /* Content overlaid on video */
                } <
                div className = "about-content" >
                <
                SectionHeader title = "About Us"
                subtitle = "Pioneering the future of computing through research and innovation" /
                >
                <
                div className = "text-section" >
                <
                p className = "text-section-large" >
                The Department of Nxt - Gen Computing at SIMATS Engineering is dedicated to advancing computing technologies through research, innovation, and education. < span > Our faculty and students work on cutting - edge projects in AI, quantum computing, and cybersecurity— shaping the future of technology
                for a better tomorrow. < /span> < /
                p > <
                /div> {
                /* Full-width feature cards */
            } <
            div className = "about-features-fullwidth" >
            <
            div className = "about-feature" >
            <
            div className = "about-feature-icon" > < Icon name = "graduationCap"
        size = {
            32
        }
        /></div >
        <
        h4 > NAAC A++Accredited < /h4> <
        p > Recognized
        for academic excellence < /p> < /
        div > <
            div className = "about-feature" >
            <
            div className = "about-feature-icon" > < Icon name = "briefcase"
        size = {
            32
        }
        /></div >
        <
        h4 > 100 % Placement < /h4> <
        p > Industry - ready graduates < /p> < /
        div > <
            div className = "about-feature" >
            <
            div className = "about-feature-icon" > < Icon name = "flask"
        size = {
            32
        }
        /></div >
        <
        h4 > Research Excellence < /h4> <
        p > Cutting - edge innovation < /p> < /
        div > <
            div className = "about-feature" >
            <
            div className = "about-feature-icon" > < Icon name = "building"
        size = {
            32
        }
        /></div >
        <
        h4 > Modern Labs < /h4> <
        p > State - of -the - art facilities < /p> < /
        div > <
            /div> < /
        div > <
            /section>
    );
};

// Vision & Mission Section
const VisionMission = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            const cards = sectionRef.current.querySelectorAll('.vm-card');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    delay: i * 0.2,
                    ease: 'expo.out'
                });
            });
        }
    }, []);

    return ( <
        section className = "section vm-section"
        id = "vision"
        ref = {
            sectionRef
        } >
        <
        SectionHeader title = "Vision & Mission"
        subtitle = "Our guiding principles for shaping the future" /
        >
        <
        div className = "vm-grid" >
        <
        div className = "vm-card" >
        <
        div className = "vm-card-icon" > < Icon name = "globe"
        size = {
            48
        }
        /></div >
        <
        h3 > Our Vision < /h3> <
        p > To be a global leader in next - generation computing, driving cutting - edge research, innovation, and collaboration across academia, industry, and government to shape the future of computing
        for a better world. < /p> < /
        div > <
        div className = "vm-card" >
        <
        div className = "vm-card-icon" > < Icon name = "rocket"
        size = {
            48
        }
        /></div >
        <
        h3 > Our Mission < /h3> <
        ul >
        <
        li > Provide world - class education and training < /li> <
        li > Foster collaboration among academia and industry < /li> <
        li > Translate research into practical applications < /li> <
        li > Promote ethical development of technologies < /li> < /
        ul > <
        /div> < /
        div > <
        /section>
    );
};

// Research Section Component with Background Video
const Research = ({ scrollToSection }) => {
  const items = [
    { number: '01', title: 'Machine Learning', desc: 'Advanced ML algorithms and predictive models' },
    { number: '02', title: 'Deep Learning Neural Networks', desc: 'CNN, RNN, Transformers and modern architectures' },
    { number: '03', title: 'Quantum Computing', desc: 'Next-generation quantum algorithms and applications' },
    { number: '04', title: 'Large Language Models', desc: 'GPT, BERT, and domain-specific LLM research' },
    { number: '05', title: 'Cyber Security', desc: 'AI-driven security solutions and threat detection' }
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const serviceItems = sectionRef.current.querySelectorAll('.service-item');
      serviceItems.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'expo.out'
        });
      });
    }
  }, []);

  return (
    <section className="section research-section-video" id="research" ref={sectionRef}>
      {/* Background video */}
      <div className="research-video-bg">
        <video className="research-bg-video" autoPlay loop muted playsInline>
          <source src="videos/research-animation.mp4" type="video/mp4" />
        </video>
        <div className="research-video-overlay" />
      </div>

      <div className="research-content">
        <SectionHeader 
          title="Research Focus" 
          subtitle="Exploring the frontiers of computing technology"
          link="#research"
          linkText="View all areas"
        />
        
        <div className="services-list">
          {items.map((item, i) => (
            <div 
              key={`research-${i}`} 
              className="service-item" 
              data-cursor="explore"
            >
              <span className="service-number">{item.number}</span>
              <div className="service-content">
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
              </div>
              <div className="service-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Gallery Section with Carousel
const Gallery = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [lightbox, setLightbox] = useState(null);
    const sectionRef = useRef(null);

    const galleryData = [{
            src: 'images/Events/Dubai.jpg',
            title: 'International Conference - Dubai',
            desc: 'Faculty presenting research at global AI summit'
        },
        {
            src: 'images/Events/GoldenBookAward.jpg',
            title: 'Golden Book Award',
            desc: 'Recognition for research excellence'
        },
        {
            src: 'images/Events/SIH2025.jpeg',
            title: 'Smart India Hackathon 2025',
            desc: 'Student innovation showcase'
        },
        {
            src: 'images/Events/CoyotechGroupPhoto.jpg',
            title: 'Coyotech Event',
            desc: 'Industry collaboration event'
        },
        {
            src: 'images/Events/GroupDiscussion.jpg',
            title: 'Group Discussion',
            desc: 'Interactive learning sessions'
        },
        {
            src: 'images/Events/Event1.jpg',
            title: 'Department Event',
            desc: 'Academic activities and celebrations'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % galleryData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + galleryData.length) % galleryData.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.querySelector('.gallery-carousel'), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                },
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });
        }
    }, []);

    return ( <
        section className = "section gallery-section"
        id = "gallery"
        ref = {
            sectionRef
        } >
        <
        SectionHeader title = "Gallery"
        subtitle = "Glimpses of our journey and achievements"
        link = "#"
        linkText = "View all photos →" /
        >

        <
        div className = "gallery-carousel" >
        <
        div className = "gallery-main" >
        <
        button className = "gallery-nav gallery-prev"
        onClick = {
            prevSlide
        } >
        <
        svg viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "2" >
        <
        polyline points = "15 18 9 12 15 6" > < /polyline> < /
        svg > <
        /button>

        <
        div className = "gallery-slides" > {
            galleryData.map((item, i) => ( <
                div key = {
                    i
                }
                className = {
                    `gallery-slide ${i === currentSlide ? 'active' : ''}`
                }
                data-cursor = "view"
                onClick = {
                    () => setLightbox(item)
                } >
                <
                img src = {
                    item.src
                }
                alt = {
                    item.title
                }
                /> <
                div className = "gallery-slide-info" >
                <
                h4 > {
                    item.title
                } < /h4> <
                p > {
                    item.desc
                } < /p> < /
                div > <
                /div>
            ))
        } <
        /div>

        <
        button className = "gallery-nav gallery-next"
        onClick = {
            nextSlide
        } >
        <
        svg viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "2" >
        <
        polyline points = "9 18 15 12 9 6" > < /polyline> < /
        svg > <
        /button> < /
        div >

        <
        div className = "gallery-thumbnails" > {
            galleryData.map((item, i) => ( <
                button key = {
                    i
                }
                className = {
                    `gallery-thumb ${i === currentSlide ? 'active' : ''}`
                }
                onClick = {
                    () => goToSlide(i)
                } >
                <
                img src = {
                    item.src
                }
                alt = {
                    item.title
                }
                /> < /
                button >
            ))
        } <
        /div>

        <
        div className = "gallery-dots" > {
            galleryData.map((_, i) => ( <
                button key = {
                    i
                }
                className = {
                    `gallery-dot ${i === currentSlide ? 'active' : ''}`
                }
                onClick = {
                    () => goToSlide(i)
                }
                />
            ))
        } <
        /div> < /
        div >

        {
            /* Lightbox */
        } {
            lightbox && ( <
                div className = "lightbox"
                onClick = {
                    () => setLightbox(null)
                } >
                <
                div className = "lightbox-content"
                onClick = {
                    (e) => e.stopPropagation()
                } >
                <
                button className = "lightbox-close"
                onClick = {
                    () => setLightbox(null)
                } > × < /button> <
                img src = {
                    lightbox.src
                }
                alt = {
                    lightbox.title
                }
                /> <
                div className = "lightbox-info" >
                <
                h3 > {
                    lightbox.title
                } < /h3> <
                p > {
                    lightbox.desc
                } < /p> < /
                div > <
                /div> < /
                div >
            )
        } <
        /section>
    );
};

// Achievements Section Component with Background Video
const Achievements = () => {
    const sectionRef = useRef(null);

    const featuredAchievement = {
        title: 'Faculty as Viva Voce Examiner — Dr. K. Anita Davamani',
        description: 'The renowned faculty member Dr. K. Anita Davamani from the Department of Nxt-Gen Computing was invited as Viva Voce Examiner for an academic assessment at Bharat University. Their expertise in advanced computing and research methodologies played a pivotal role in evaluating research scholars and guiding them in their academic journey.',
        highlight: 'This prestigious opportunity reflects the faculty\'s commitment to academic excellence and their contribution to shaping the next generation of innovators.',
        image: 'images/Achievements-1.jpg'
    };

    const achievements = [{
            iconName: 'trophy',
            title: 'NAAC A++ Grade',
            desc: 'National accreditation for excellence'
        },
        {
            iconName: 'star',
            title: 'QS World Ranking',
            desc: 'Among top universities in India'
        },
        {
            iconName: 'bookOpen',
            title: '50+ Publications',
            desc: 'In international journals'
        },
        {
            iconName: 'handshake',
            title: '15+ Partners',
            desc: 'Industry collaborations'
        }
    ];

    useEffect(() => {
        if (sectionRef.current) {
            // Animate featured achievement
            gsap.from('.achievement-featured', {
                scrollTrigger: {
                    trigger: '.achievement-featured',
                    start: 'top 85%'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'expo.out'
            });

            const cards = sectionRef.current.querySelectorAll('.achievement-card');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: 'expo.out'
                });
            });
        }
    }, []);

    return ( <
        section className = "section achievements-section-video"
        id = "achievements"
        ref = {
            sectionRef
        } > {
            /* Full-screen background video */
        } <
        div className = "achievements-video-bg" >
        <
        video className = "achievements-bg-video"
        autoPlay loop muted playsInline >
        <
        source src = "videos/achievements-animation.mp4"
        type = "video/mp4" / >
        <
        /video> <
        div className = "achievements-video-overlay" > < /div> < /
        div >

        {
            /* Content overlaid on video */
        } <
        div className = "achievements-content" >
        <
        SectionHeader title = "Achievements"
        subtitle = "Recognition of our excellence and impact" /
        >

        {
            /* Featured Achievement */
        } <
        div className = "achievement-featured" >
        <
        div className = "achievement-featured-image" >
        <
        img src = {
            featuredAchievement.image
        }
        alt = {
            featuredAchievement.title
        }
        /> < /
        div > <
        div className = "achievement-featured-content" >
        <
        h3 > {
            featuredAchievement.title
        } < /h3> <
        p > {
            featuredAchievement.description
        } < /p> <
        p className = "achievement-highlight" > {
            featuredAchievement.highlight
        } < /p> < /
        div > <
        /div>

        <
        div className = "achievements-grid" > {
            achievements.map((item, i) => ( <
                div className = "achievement-card"
                key = {
                    i
                } >
                <
                div className = "achievement-icon" > < Icon name = {
                    item.iconName
                }
                size = {
                    40
                }
                /></div >
                <
                h4 > {
                    item.title
                } < /h4> <
                p > {
                    item.desc
                } < /p> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /section>
    );
};

// Faculty Section Component with Flip Cards
const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        fetch('faculty.json')
            .then(res => res.json())
            .then(data => setFaculty(data.slice(0, 8)))
            .catch(() => {
                // Use real faculty data from images folder
                setFaculty([{
                        name: 'Dr. Vijayaragavan P',
                        position: 'Head of Department',
                        research_focus: 'Machine Learning, AI',
                        qualification: 'Ph.D',
                        experience: '17 Years',
                        email: 'vijayaragavanp.sse@saveetha.com',
                        image: 'images/Vijayaragavan.jpg'
                    },
                    {
                        name: 'Dr. Ramesh Kumar',
                        position: 'Professor',
                        research_focus: 'Deep Learning',
                        qualification: 'Ph.D',
                        experience: '23 Years',
                        email: 'rameshkumark.sse@saveetha.com',
                        image: 'images/Rameshkumar.jpg'
                    },
                    {
                        name: 'Dr. Anita Davamani',
                        position: 'Professor',
                        research_focus: 'Machine Learning & Deep Learning',
                        qualification: 'Ph.D',
                        experience: '15 Years',
                        email: 'anitadavamanik.sse@saveetha.com',
                        image: 'images/Anita.jpg'
                    },
                    {
                        name: 'Dr. Fahad',
                        position: 'Assistant Professor',
                        research_focus: 'Data Communication, Networks',
                        qualification: 'CISCO Faculty',
                        experience: '8+ Years',
                        email: 'fahad24in@gmail.com',
                        image: 'images/Fahad.jpg'
                    },
                    {
                        name: 'Dr. Hemavathi R',
                        position: 'Assistant Professor',
                        research_focus: 'Big Data, Machine Learning',
                        qualification: 'Ph.D',
                        experience: '9 Years',
                        email: 'rhemavathi.sse@saveetha.com',
                        image: 'images/Hema.jpg'
                    },
                    {
                        name: 'Dr. K.C. Sharmili',
                        position: 'Assistant Professor',
                        research_focus: 'Data Mining, Machine Learning',
                        qualification: 'Ph.D',
                        experience: '11 Years',
                        email: 'sharmilik.sse@saveetha.com',
                        image: 'images/Sharmili.jpg'
                    }
                ]);
            });
    }, []);

    useEffect(() => {
        if (sectionRef.current && faculty.length > 0) {
            const cards = sectionRef.current.querySelectorAll('.team-card');

            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                    y: 60,
                    opacity: 0,
                    rotateY: -15,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'expo.out'
                });
            });
        }
    }, [faculty]);

    return ( <
        section className = "section"
        id = "faculty"
        ref = {
            sectionRef
        } >
        <
        SectionHeader title = "Our Faculty"
        subtitle = "Meet our expert team of educators and researchers"
        link = "#"
        linkText = "View all faculty →" /
        >
        <
        div className = "team-grid" > {
            faculty.map((member, i) => ( <
                div className = "team-card flip-card"
                key = {
                    i
                }
                data-cursor = "view" >
                <
                div className = "flip-card-inner" > {
                    /* Front Face */
                } <
                div className = "flip-card-front" >
                <
                img src = {
                    member.image
                }
                alt = {
                    member.name
                }
                className = "team-card-image"
                loading = "lazy" /
                >
                <
                div className = "team-card-info" >
                <
                h4 className = "team-card-name" > {
                    member.name
                } < /h4> <
                p className = "team-card-role" > {
                    member.position
                } < /p> < /
                div > <
                /div>

                {
                    /* Back Face */
                } <
                div className = "flip-card-back" >
                <
                div className = "back-content" >
                <
                h4 className = "back-name" > {
                    member.name
                } < /h4> <
                p className = "back-position" > {
                    member.position
                } < /p>

                <
                div className = "back-details" > {
                    member.qualification && ( <
                        div className = "back-item" >
                        <
                        Icon name = "graduationCap"
                        size = {
                            16
                        }
                        /> <
                        span > {
                            member.qualification
                        } < /span> < /
                        div >
                    )
                } {
                    member.experience && ( <
                        div className = "back-item" >
                        <
                        Icon name = "briefcase"
                        size = {
                            16
                        }
                        /> <
                        span > {
                            member.experience
                        } < /span> < /
                        div >
                    )
                } {
                    (member.research_focus || member.research) && ( <
                        div className = "back-item" >
                        <
                        Icon name = "flask"
                        size = {
                            16
                        }
                        /> <
                        span > {
                            member.research_focus || member.research
                        } < /span> < /
                        div >
                    )
                } {
                    member.email && ( <
                        div className = "back-item" >
                        <
                        Icon name = "mail"
                        size = {
                            16
                        }
                        /> <
                        span > {
                            member.email
                        } < /span> < /
                        div >
                    )
                } <
                /div>

                <
                div className = "back-links" > {
                    member.linkedin && member.linkedin !== '#' && ( <
                        a href = {
                            member.linkedin
                        }
                        target = "_blank"
                        rel = "noopener noreferrer"
                        className = "back-link" > LinkedIn < /a>
                    )
                } {
                    member.google_scholar && member.google_scholar !== '#' && ( <
                        a href = {
                            member.google_scholar
                        }
                        target = "_blank"
                        rel = "noopener noreferrer"
                        className = "back-link" > Scholar < /a>
                    )
                } {
                    member.scopus && member.scopus !== '#' && ( <
                        a href = {
                            member.scopus
                        }
                        target = "_blank"
                        rel = "noopener noreferrer"
                        className = "back-link" > Scopus < /a>
                    )
                } <
                /div> < /
                div > <
                /div> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        section >
    );
};

// Events Section Component
const Events = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('all');
    const sectionRef = useRef(null);

    useEffect(() => {
        fetch('events.json')
            .then(res => res.json())
            .then(data => {
                const now = new Date();
                const processed = data.map(e => {
                    const start = new Date(e.eventStart);
                    const end = new Date(e.eventEnd);
                    let status = 'upcoming';
                    if (now > end) status = 'completed';
                    else if (now >= start && now <= end) status = 'ongoing';
                    return {
                        ...e,
                        status
                    };
                });
                setEvents(processed);
            })
            .catch(() => {
                setEvents([{
                        title: 'AI Workshop 2025',
                        venue: 'Main Auditorium',
                        status: 'upcoming',
                        eventStart: '2025-01-15',
                        eventEnd: '2025-01-16'
                    },
                    {
                        title: 'Research Symposium',
                        venue: 'Conference Hall',
                        status: 'ongoing',
                        eventStart: '2024-12-10',
                        eventEnd: '2024-12-15'
                    },
                    {
                        title: 'Tech Fest 2024',
                        venue: 'Campus',
                        status: 'completed',
                        eventStart: '2024-10-01',
                        eventEnd: '2024-10-03'
                    }
                ]);
            });
    }, []);

    const filteredEvents = filter === 'all' ? events : events.filter(e => e.status === filter);

    useEffect(() => {
        if (sectionRef.current) {
            const items = sectionRef.current.querySelectorAll('.event-card');

            items.forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'expo.out'
                });
            });
        }
    }, [filteredEvents]);

    return ( <
        section className = "section events-section-video"
        id = "events"
        ref = {
            sectionRef
        } > {
            /* Full-screen background video */
        } <
        div className = "events-video-bg" >
        <
        video className = "events-bg-video"
        autoPlay loop muted playsInline >
        <
        source src = "videos/events-animation.mp4"
        type = "video/mp4" / >
        <
        /video> <
        div className = "events-video-overlay" > < /div> < /
        div >

        {
            /* Content overlaid on video */
        } <
        div className = "events-content" >
        <
        SectionHeader title = "Events"
        subtitle = "Workshops, seminars, and conferences"
        link = "#"
        linkText = "View all events →" /
        >

        <
        div className = "events-filters" > {
            ['all', 'upcoming', 'ongoing', 'completed'].map(f => ( <
                button key = {
                    f
                }
                className = {
                    `filter-btn ${filter === f ? 'active' : ''}`
                }
                onClick = {
                    () => setFilter(f)
                } > {
                    f.charAt(0).toUpperCase() + f.slice(1)
                } <
                /button>
            ))
        } <
        /div>

        <
        div className = "events-grid" > {
            filteredEvents.slice(0, 6).map((event, i) => ( <
                div className = "event-card"
                key = {
                    i
                }
                data-cursor = "view" >
                <
                div className = {
                    `event-status ${event.status}`
                } > {
                    event.status
                } < /div> <
                h4 className = "event-title" > {
                    event.title
                } < /h4> <
                p className = "event-venue" > {
                    event.venue
                } < /p> <
                p className = "event-date" > {
                    new Date(event.eventStart).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })
                } <
                /p> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /section>
    );
};

// ==========================================
// ANALYTICS DASHBOARD COMPONENT
// ==========================================

// Custom hook for analytics data with mock API
const useAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        // Simulated API response with realistic fluctuations
        const mockData = {
            instagram: {
                views: Math.floor(12000 + Math.random() * 1000),
                trend: parseFloat((5 + Math.random() * 10).toFixed(1)),
                history: Array.from({
                    length: 7
                }, () => Math.floor(10000 + Math.random() * 3000))
            },
            facebook: {
                views: Math.floor(8500 + Math.random() * 800),
                trend: parseFloat((-5 + Math.random() * 10).toFixed(1)),
                history: Array.from({
                    length: 7
                }, () => Math.floor(7000 + Math.random() * 2500))
            },
            website: {
                views: Math.floor(45000 + Math.random() * 2000),
                trend: parseFloat((10 + Math.random() * 8).toFixed(1)),
                history: Array.from({
                    length: 7
                }, () => Math.floor(40000 + Math.random() * 8000))
            },
            lastUpdated: new Date().toISOString()
        };

        setData(mockData);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};

// Mini Sparkline Component (CSS-based)
const MiniSparkline = ({
    data,
    color
}) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return ( <
        div className = "sparkline" > {
            data.map((value, i) => ( <
                div key = {
                    i
                }
                className = "sparkline-bar"
                style = {
                    {
                        height: `${((value - min) / range) * 100}%`,
                        background: color,
                        animationDelay: `${i * 0.1}s`
                    }
                }
                />
            ))
        } <
        /div>
    );
};

// Trend Indicator Component
const TrendIndicator = ({
    value
}) => {
    const isPositive = value >= 0;
    return ( <
        div className = {
            `trend-indicator ${isPositive ? 'positive' : 'negative'}`
        } >
        <
        svg className = "trend-arrow"
        viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "3"
        style = {
            {
                transform: isPositive ? 'rotate(0deg)' : 'rotate(180deg)'
            }
        } >
        <
        polyline points = "18 15 12 9 6 15" > < /polyline> < /
        svg > <
        span > {
            Math.abs(value)
        } % < /span> < /
        div >
    );
};

// Animated Counter Component
const AnimatedCounter = ({
    value,
    duration = 1.5
}) => {
    const [displayValue, setDisplayValue] = useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
        if (counterRef.current && typeof gsap !== 'undefined') {
            gsap.to({
                val: displayValue
            }, {
                val: value,
                duration: duration,
                ease: 'power2.out',
                onUpdate: function() {
                    setDisplayValue(Math.floor(this.targets()[0].val));
                }
            });
        }
    }, [value]);

    return ( <
        span ref = {
            counterRef
        }
        className = "counter-value" > {
            displayValue.toLocaleString()
        } <
        /span>
    );
};

// Stat Card Component
const StatCard = ({
    icon,
    title,
    value,
    trend,
    history,
    color,
    delay = 0
}) => {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current && typeof gsap !== 'undefined') {
            gsap.from(cardRef.current, {
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%'
                },
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                delay: delay,
                ease: 'expo.out'
            });
        }
    }, [delay]);

    return ( <
        div className = "stat-card"
        ref = {
            cardRef
        }
        style = {
            {
                '--card-color': color
            }
        } >
        <
        div className = "stat-card-header" >
        <
        div className = "stat-card-icon"
        style = {
            {
                background: color
            }
        } > {
            icon
        } <
        /div> <
        TrendIndicator value = {
            trend
        }
        /> < /
        div > <
        div className = "stat-card-body" >
        <
        div className = "stat-card-value" >
        <
        AnimatedCounter value = {
            value
        }
        /> < /
        div > <
        div className = "stat-card-title" > {
            title
        } < /div> < /
        div > <
        div className = "stat-card-footer" >
        <
        MiniSparkline data = {
            history
        }
        color = {
            color
        }
        /> <
        span className = "stat-card-label" > Last 7 days < /span> < /
        div > <
        /div>
    );
};

// Main Analytics Dashboard Component
const AnalyticsDashboard = () => {
    const {
        data,
        loading,
        refetch
    } = useAnalytics();
    const sectionRef = useRef(null);
    const [lastUpdate, setLastUpdate] = useState('');

    useEffect(() => {
        if (data && data.lastUpdated) {
            const date = new Date(data.lastUpdated);
            setLastUpdate(date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }));
        }
    }, [data]);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from('.dashboard-header', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'expo.out'
            });
        }
    }, []);

    const totalEngagement = data ?
        data.instagram.views + data.facebook.views + data.website.views : 0;
    const avgTrend = data ?
        parseFloat(((data.instagram.trend + data.facebook.trend + data.website.trend) / 3).toFixed(1)) : 0;
    const totalHistory = data ?
        data.instagram.history.map((v, i) => v + data.facebook.history[i] + data.website.history[i]) :
        Array(7).fill(0);

    return ( <
        section className = "section analytics-section"
        id = "analytics"
        ref = {
            sectionRef
        } >
        <
        div className = "analytics-bg-pattern" > < /div>

        <
        div className = "dashboard-header" >
        <
        SectionHeader title = "Live Analytics"
        subtitle = "Real-time insights from our social media and website" /
        >
        <
        div className = "dashboard-meta" >
        <
        span className = "live-indicator" >
        <
        span className = "live-dot" > < /span>
        Live <
        /span> <
        span className = "last-update" > Updated {
            lastUpdate
        } < /span> <
        button className = "refresh-btn"
        onClick = {
            refetch
        }
        aria-label = "Refresh data" >
        <
        svg viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "2" >
        <
        polyline points = "23 4 23 10 17 10" > < /polyline> <
        path d = "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" > < /path> < /
        svg > <
        /button> < /
        div > <
        /div>

        {
            loading ? ( <
                div className = "stats-grid" > {
                    [1, 2, 3, 4].map(i => ( <
                        div key = {
                            i
                        }
                        className = "stat-card skeleton" >
                        <
                        div className = "skeleton-icon" > < /div> <
                        div className = "skeleton-text" > < /div> <
                        div className = "skeleton-value" > < /div> < /
                        div >
                    ))
                } <
                /div>
            ) : (
                <div className = "stats-grid" >
                <
                StatCard icon = {
                    <
                    svg viewBox = "0 0 24 24"
                    fill = "currentColor" >
                    <
                    path d = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" / >
                    <
                    /svg>
                }
                title = "Instagram Views"
                value = {
                    data.instagram.views
                }
                trend = {
                    data.instagram.trend
                }
                history = {
                    data.instagram.history
                }
                color = "linear-gradient(135deg, #E1306C 0%, #F77737 100%)"
                delay = {
                    0
                }
                /> <
                StatCard icon = {
                    <
                    svg viewBox = "0 0 24 24"
                    fill = "currentColor" >
                    <
                    path d = "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" / >
                    <
                    /svg>
                }
                title = "Facebook Views"
                value = {
                    data.facebook.views
                }
                trend = {
                    data.facebook.trend
                }
                history = {
                    data.facebook.history
                }
                color = "linear-gradient(135deg, #1877F2 0%, #4267B2 100%)"
                delay = {
                    0.15
                }
                /> <
                StatCard icon = {
                    <
                    svg viewBox = "0 0 24 24"
                    fill = "none"
                    stroke = "currentColor"
                    strokeWidth = "2" >
                    <
                    circle cx = "12"
                    cy = "12"
                    r = "10" > < /circle> <
                    line x1 = "2"
                    y1 = "12"
                    x2 = "22"
                    y2 = "12" > < /line> <
                    path d = "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" > < /path> < /
                    svg >
                }
                title = "Website Views"
                value = {
                    data.website.views
                }
                trend = {
                    data.website.trend
                }
                history = {
                    data.website.history
                }
                color = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                delay = {
                    0.3
                }
                /> <
                StatCard icon = {
                    <
                    svg viewBox = "0 0 24 24"
                    fill = "none"
                    stroke = "currentColor"
                    strokeWidth = "2" >
                    <
                    path d = "M18 20V10" > < /path> <
                    path d = "M12 20V4" > < /path> <
                    path d = "M6 20v-6" > < /path> < /
                    svg >
                }
                title = "Total Engagement"
                value = {
                    totalEngagement
                }
                trend = {
                    avgTrend
                }
                history = {
                    totalHistory
                }
                color = "linear-gradient(135deg, #FF6B6B 0%, #4B7BEC 100%)"
                delay = {
                    0.45
                }
                /> < /
                div >
            )
        } <
        /section>
    );
};

// Contact Section Component
const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.querySelector('.contact-cta'), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                },
                x: -60,
                opacity: 0,
                duration: 1,
                ease: 'expo.out'
            });

            gsap.from(sectionRef.current.querySelector('.contact-form'), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%'
                },
                x: 60,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'expo.out'
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        setTimeout(() => {
            setStatus('sent');
            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return ( <
        section className = "contact-section"
        id = "contact"
        ref = {
            sectionRef
        } >
        <
        div className = "contact-content" >
        <
        div className = "contact-cta" >
        <
        h2 className = "section-title" > Get in touch < /h2> <
        p className = "contact-subtitle" > Have questions about our programs, research opportunities, or admissions ? We 'd love to hear from you.</p>

        <
        div className = "contact-info" >
        <
        div className = "contact-info-item" >
        <
        div className = "contact-info-icon" > < Icon name = "mail"
        size = {
            24
        }
        /></div >
        <
        div >
        <
        div className = "contact-info-label" > Email < /div> <
        div className = "contact-info-value" > vijayaragavanp.sse @saveetha.com < /div> < /
        div > <
        /div> <
        div className = "contact-info-item" >
        <
        div className = "contact-info-icon" > < Icon name = "phone"
        size = {
            24
        }
        /></div >
        <
        div >
        <
        div className = "contact-info-label" > Phone < /div> <
        div className = "contact-info-value" > +91 95977 46085 < /div> < /
        div > <
        /div> <
        div className = "contact-info-item" >
        <
        div className = "contact-info-icon" > < Icon name = "mapPin"
        size = {
            24
        }
        /></div >
        <
        div >
        <
        div className = "contact-info-label" > Address < /div> <
        div className = "contact-info-value" > SIMATS Engineering, Saveetha Nagar, Thandalam, Chennai - 602 105 < /div> < /
        div > <
        /div> < /
        div > <
        /div>

        <
        form className = "contact-form"
        onSubmit = {
            handleSubmit
        } >
        <
        div className = "form-row" >
        <
        div className = "form-group" >
        <
        input type = "text"
        className = "form-input"
        placeholder = "Your Name"
        value = {
            formState.name
        }
        onChange = {
            (e) => setFormState({
                ...formState,
                name: e.target.value
            })
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "email"
        className = "form-input"
        placeholder = "Email Address"
        value = {
            formState.email
        }
        onChange = {
            (e) => setFormState({
                ...formState,
                email: e.target.value
            })
        }
        required /
        >
        <
        /div> < /
        div > <
        div className = "form-group" >
        <
        input type = "text"
        className = "form-input"
        placeholder = "Subject"
        value = {
            formState.subject
        }
        onChange = {
            (e) => setFormState({
                ...formState,
                subject: e.target.value
            })
        }
        /> < /
        div > <
        div className = "form-group" >
        <
        textarea className = "form-input form-textarea"
        placeholder = "Your Message"
        value = {
            formState.message
        }
        onChange = {
            (e) => setFormState({
                ...formState,
                message: e.target.value
            })
        }
        required >
        <
        /textarea> < /
        div > <
        button type = "submit"
        className = "form-submit"
        disabled = {
            status === 'sending'
        } > {
            status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : 'Send Message'
        } <
        /button> < /
        form > <
        /div> < /
        section >
    );
};

// Footer Component
const Footer = ({
    scrollToSection
}) => {
    const handleClick = (e, id) => {
        e.preventDefault();
        scrollToSection(id);
    };

    return ( <
        footer className = "footer" >
        <
        div className = "footer-content" >
        <
        div className = "footer-brand" >
        <
        span className = "footer-logo" > Nxt - Gen Computing < /span> <
        p className = "footer-desc" > Shaping the future of technology through innovation and education. < /p> < /
        div > <
        div className = "footer-links-grid" >
        <
        div className = "footer-links-col" >
        <
        h4 > Quick Links < /h4> <
        a href = "#about"
        onClick = {
            (e) => handleClick(e, '#about')
        } > About < /a> <
        a href = "#research"
        onClick = {
            (e) => handleClick(e, '#research')
        } > Research < /a> <
        a href = "#faculty"
        onClick = {
            (e) => handleClick(e, '#faculty')
        } > Faculty < /a> < /
        div > <
        div className = "footer-links-col" >
        <
        h4 > Resources < /h4> <
        a href = "#gallery"
        onClick = {
            (e) => handleClick(e, '#gallery')
        } > Gallery < /a> <
        a href = "#events"
        onClick = {
            (e) => handleClick(e, '#events')
        } > Events < /a> <
        a href = "#contact"
        onClick = {
            (e) => handleClick(e, '#contact')
        } > Contact < /a> < /
        div > <
        div className = "footer-links-col" >
        <
        h4 > Connect < /h4> <
        a href = "mailto:vijayaragavanp.sse@saveetha.com" > Email Us < /a> <
        a href = "tel:+919597746085" > Call Us < /a> <
        a href = "https://www.saveetha.com"
        target = "_blank" > SIMATS Website < /a> < /
        div > <
        div className = "footer-map" >
        <
        h4 > Location < /h4> <
        iframe src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1524480755293!2d80.01389277484239!3d13.025962287294469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528bac1ae5a3bb%3A0xe16a7b4e839e6daf!2sSIMATS%20ENGINEERING!5e0!3m2!1sen!2sin!4v1765690148553!5m2!1sen!2sin"
        width = "100%"
        height = "200"
        style = {
            {
                border: 0,
                borderRadius: '12px'
            }
        }
        allowFullScreen = ""
        loading = "lazy"
        referrerPolicy = "no-referrer-when-downgrade"
        title = "SIMATS Engineering Location" >
        <
        /iframe> < /
        div > <
        /div> < /
        div > <
        div className = "footer-bottom" >
        <span className="footer-copy">©2025 Department of Nxt-Gen Computing, SIMATS Engineering. </span>
        <span className="footer-copy">Developed by <a href="https://shreyan-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-dev-link">Shreyan</a>. All rights reserved.</span>
        </div>
        </footer>
    );
};

// AI Assistant Component
const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setMessages([{
                role: 'assistant',
                content: 'Hi! I\'m the Nxt-Gen Assistant. I can help you learn about our department, faculty, research, and events. How can I help you today?'
            }]);
        }, 2500);
    }, []);

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (/hello|hi|hey/.test(lowerQuery)) {
            return 'Hello! How can I assist you today? You can ask me about our research areas, faculty, events, or contact information.';
        }
        if (/about|department|what is/.test(lowerQuery)) {
            return 'The Department of Nxt-Gen Computing at SIMATS Engineering is dedicated to advancing AI, Machine Learning, Quantum Computing, and cybersecurity research. We have 10+ expert faculty members and 500+ students.';
        }
        if (/research|areas|focus/.test(lowerQuery)) {
            return 'Our research focuses on: <br>• Machine Learning<br>• Deep Learning & Neural Networks<br>• Quantum Computing<br>• Large Language Models<br>• Cyber Security<br><br>Would you like to know more about any specific area?';
        }
        if (/faculty|professor|teacher|hod/.test(lowerQuery)) {
            return 'We have 10+ expert faculty members. The department is headed by <strong>Dr. Vijayaragavan P</strong>. You can view all faculty profiles in the Faculty section.';
        }
        if (/contact|email|phone|address/.test(lowerQuery)) {
            return '<strong>Contact Information:</strong><br>• Email: vijayaragavanp.sse@saveetha.com<br>• Phone: +91 95977 46085<br>• Address: SIMATS Engineering, Chennai - 602105';
        }
        if (/event|workshop|seminar/.test(lowerQuery)) {
            return 'Check our Events section for upcoming workshops, seminars, and conferences. We regularly host AI workshops and research symposiums. Use the filters to see upcoming, ongoing, or completed events.';
        }
        if (/vision|mission/.test(lowerQuery)) {
            return 'Our <strong>Vision</strong> is to be a global leader in next-generation computing. Our <strong>Mission</strong> includes providing world-class education, fostering collaboration, and promoting ethical technology development.';
        }
        if (/gallery|photo|image/.test(lowerQuery)) {
            return 'Visit our Gallery section to see photos from events, conferences, and campus activities. Click on any image to view it in full size.';
        }
        if (/admission|apply|join/.test(lowerQuery)) {
            return 'For admissions, please contact our office at +91 95977 46085 or email vijayaragavanp.sse@saveetha.com. Visit www.saveetha.com for more details.';
        }

        return 'I can help you with information about our department, research areas, faculty, events, and contact details. What would you like to know?';
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = {
            role: 'user',
            content: input
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        setTimeout(() => {
            const response = generateResponse(input);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response
            }]);
        }, 500);
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const suggestions = ['About department', 'Research areas', 'Faculty info', 'Contact us'];

    return ( <
        div className = {
            `ai-assistant ${isOpen ? 'open' : ''}`
        } >
        <
        button className = "ai-toggle"
        onClick = {
            () => setIsOpen(!isOpen)
        } >
        <
        span className = "ai-icon" > {
            /* Robot Chatbot Icon */
        } <
        svg width = "28"
        height = "28"
        viewBox = "0 0 64 64"
        fill = "none" > {
            /* Robot head */
        } <
        rect x = "12"
        y = "18"
        width = "40"
        height = "32"
        rx = "8"
        fill = "currentColor" / > {
            /* Antenna */
        } <
        circle cx = "32"
        cy = "10"
        r = "4"
        fill = "currentColor" / >
        <
        rect x = "30"
        y = "12"
        width = "4"
        height = "8"
        fill = "currentColor" / > {
            /* Eyes */
        } <
        circle cx = "22"
        cy = "32"
        r = "5"
        fill = "white"
        className = "robot-eye left-eye" / >
        <
        circle cx = "42"
        cy = "32"
        r = "5"
        fill = "white"
        className = "robot-eye right-eye" / >
        <
        circle cx = "23"
        cy = "32"
        r = "2"
        fill = "#333"
        className = "robot-pupil left-pupil" / >
        <
        circle cx = "43"
        cy = "32"
        r = "2"
        fill = "#333"
        className = "robot-pupil right-pupil" / > {
            /* Mouth - smile */
        } <
        path d = "M24 42 Q32 48 40 42"
        stroke = "white"
        strokeWidth = "3"
        fill = "none"
        strokeLinecap = "round" / > {
            /* Ears/Sides */
        } <
        rect x = "6"
        y = "28"
        width = "6"
        height = "12"
        rx = "3"
        fill = "currentColor" / >
        <
        rect x = "52"
        y = "28"
        width = "6"
        height = "12"
        rx = "3"
        fill = "currentColor" / >
        <
        /svg> < /
        span > <
        span className = "ai-close" >
        <
        svg width = "24"
        height = "24"
        viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "2" >
        <
        line x1 = "18"
        y1 = "6"
        x2 = "6"
        y2 = "18" > < /line> <
        line x1 = "6"
        y1 = "6"
        x2 = "18"
        y2 = "18" > < /line> < /
        svg > <
        /span> < /
        button >

        <
        div className = "ai-chat-window" >
        <
        div className = "ai-header" >
        <
        div className = "ai-avatar" > < Icon name = "bot"
        size = {
            20
        }
        /></div >
        <
        div className = "ai-info" >
        <
        span className = "ai-name" > Nxt - Gen Assistant < /span> <
        span className = "ai-status" >
        <
        span className = "status-dot" > < /span>
        Online <
        /span> < /
        div > <
        button className = "ai-minimize"
        onClick = {
            () => setIsOpen(false)
        } > − < /button> < /
        div >

        <div
        className="ai-messages"
        ref={messagesRef}
        data-lenis-prevent
        >
        {messages.map((msg, i) => (
            <div
            key={i}
            className={`ai-message ${msg.role} animate`}
            >
            {msg.role === 'assistant' && (
                <div className="message-avatar">
                <Icon name="bot" size={16} />
                </div>
            )}

            <div
                className="message-content"
                dangerouslySetInnerHTML={{ __html: msg.content }}
            />
            </div>
        ))}
        </div>


        <
        div className = "ai-suggestions" > {
            suggestions.map((s, i) => ( <
                button key = {
                    i
                }
                className = "suggestion-chip"
                onClick = {
                    () => {
                        setInput(s);
                        setTimeout(handleSend, 100);
                    }
                } > {
                    s
                } <
                /button>
            ))
        } <
        /div>

        <
        div className = "ai-input-area" >
        <
        input type = "text"
        id = "ai-input"
        placeholder = "Ask me anything..."
        value = {
            input
        }
        onChange = {
            (e) => setInput(e.target.value)
        }
        onKeyPress = {
            (e) => e.key === 'Enter' && handleSend()
        }
        /> <
        button id = "ai-send"
        onClick = {
            handleSend
        } >
        <
        svg width = "20"
        height = "20"
        viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        strokeWidth = "2" >
        <
        line x1 = "22"
        y1 = "2"
        x2 = "11"
        y2 = "13" > < /line> <
        polygon points = "22 2 15 22 11 13 2 9 22 2" > < /polygon> < /
        svg > <
        /button> < /
        div > <
        /div> < /
        div >
    );
};

// Main App Component
const App = () => {
    const [loading, setLoading] = useState(true);
    const [animated, setAnimated] = useState(false);

    const scrollToSection = (id) => {
        // Ensure id has # prefix for querySelector
        const selector = id.startsWith('#') ? id : `#${id}`;
        const target = document.querySelector(selector);
        if (target) {
            if (lenis) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.2
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    useEffect(() => {
        // Initialize Lenis
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        console.log('%c🎨 Nxt-Gen Computing', 'color: #0a0a0a; background: #fff; padding: 10px 20px; font-family: sans-serif; font-size: 14px;');
    }, []);

    const handlePreloaderComplete = () => {
        setLoading(false);
        setTimeout(() => setAnimated(true), 100);
    };

    return (
        <>
        <Preloader onComplete={handlePreloaderComplete} />
        <ScrollProgress />
        <Cursor />
        <Navbar scrollToSection={scrollToSection} />
        <EventMarquee scrollToSection={scrollToSection} />
        <Hero animated={animated} scrollToSection={scrollToSection} />
        <Marquee />
        <ImmersiveVisual />
        <About />
        <VisionMission />
        <Faculty />
        <Research scrollToSection={scrollToSection} />
        <Gallery />
        <Achievements />
        <Events />
        <AnalyticsDashboard />
        <Contact />
        <Footer scrollToSection={scrollToSection} />
        <AIAssistant />
        </>
    );
};

// Render the App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
