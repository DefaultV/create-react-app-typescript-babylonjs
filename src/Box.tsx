import { Mesh, MeshBuilder } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";
import { FunctionComponent, useMemo, useState } from "react";
import { useScene } from "react-babylonjs";

const Boxed: FunctionComponent = () => {
  const scene = useScene();

  const meshRef = useRef<Mesh>();
  const [mesh, setNewMesh] = useState<Mesh>(
    MeshBuilder.CreateBox("box", {}, scene)
  );

  const handleOnCreate = () => {
    const sphereMesh = MeshBuilder.CreateSphere("sphere", {}, scene);
    sphereMesh.position.y = 1;

    setNewMesh(sphereMesh);
    meshRef.current = mesh;
  };

  console.log(mesh.name, meshRef.current?.name);

  return (
    <mesh
      ref={meshRef}
      key={"swapmesh"}
      name="boxed"
      fromInstance={mesh}
      onCreated={handleOnCreate}
      disposeInstanceOnUnmount
    ></mesh>
  );
};

export { Boxed };
