#ifdef GL_ES
    precision highp float;
#endif

varying vec2 vUV;

uniform sampler2D textureSampler;

float Pi = 6.28318530718;

float Directions = 16.0;
float Quality = 2.0;
float Size = 10.0;
float spread = 100.0;
float quality = 5.0;
float intensity = 15.0;

void main(void) {
    vec2 iResolution = vec2(spread, spread);
    vec2 Radius = Size/iResolution.xy;
    vec2 uv = vUV;
    uv.x = 1.0 - vUV.x;
    vec4 Color = texture2D(textureSampler, uv);

    for( float d=0.0; d<Pi; d+=Pi/Directions){
        for(float idx=1.0/quality; idx<=1.0; idx+=1.0){
        Color += texture2D(textureSampler, uv+vec2(cos(d),sin(d))*Radius*idx);
    }}
    Color /= quality * Directions - intensity;
    gl_FragColor = Color;
}