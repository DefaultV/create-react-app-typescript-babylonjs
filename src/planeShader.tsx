import { Texture } from "@babylonjs/core";
import React, { FunctionComponent, useRef } from "react";
import { useScene } from "react-babylonjs";


const PlaneShader: FunctionComponent = () => {
    const textureArrayRef = useRef<[string, Texture]>();
    const textureRef = useRef<Texture>();
    const textureUrl = "https://upload.wikimedia.org/wikipedia/commons/8/87/Alaskan_Malamute%2BBlank.png";
    const textureUrl2 = "http://i.imgur.com/wGyk6os.png";
    const textureUrl3 = "https://en.wikipedia.org/wiki/Standard_test_image#/media/File:SIPI_Jelly_Beans_4.1.07.tiff"
    textureRef.current = new Texture(textureUrl, null);
    console.log("loaded plane shader component")
  if (textureRef.current) {
    console.log("texture assigned")
    textureArrayRef.current = ["textureSample", textureRef.current];
  }
    return (
    <transformNode
    name="root"
    >
    <plane
        name="shaderPlane"
        position-y={2}
        >
          {textureArrayRef.current && (
              <shaderMaterial
              name="artworkShadow"
              shaderPath="/shaders/shadowShader"
              setTexture={textureArrayRef.current}
              options={{
                  needAlphaBlending: true,
                  attributes: ["position", "normal", "uv"],
                  uniforms: [
                      "world",
                      "worldView",
                      "worldViewProjection",
                      "view",
                      "projection",
                    ],
                }}
                ></shaderMaterial>
                )}
        </plane>
        <plane
            name="shaderPlane"
            position-y={2}
            position-x={1}
            >
              <standardMaterial
              name="mat">
                <texture url={textureUrl} name="normal texture" hasAlpha={true}></texture>
              </standardMaterial>
            </plane>
            <plane
            name="shaderPlane"
            position-y={1}
            position-x={1}
            >
              <standardMaterial
              name="mat">
                <texture url={textureUrl2} name="normal texture" hasAlpha={true}></texture>
              </standardMaterial>
            </plane>
            <plane
            name="shaderPlane"
            position-y={1}
            position-x={0}
            >
              <standardMaterial
              name="mat">
                <texture url={textureUrl3} name="normal texture" hasAlpha={true}></texture>
              </standardMaterial>
            </plane>
        </transformNode>
        );
};

export {PlaneShader};