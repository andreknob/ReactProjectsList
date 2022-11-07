import { ComponentType } from "react";

import ProjectModal from "../../components/ProjectModal";
import UserModal from "../../components/UserModal";

function withModals<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType
) {
  return (hocProps: T) => {
    return (
      <>
        <Component {...hocProps} />
        <ProjectModal />
        <UserModal />
      </>
    );
  };
}

export default withModals;
