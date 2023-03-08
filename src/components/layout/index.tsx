import { Menu } from "./menu";
import { ReactNode } from "react";
import { Message } from "components";
import { Alert } from "components/common/message";

interface LayoutProps {
  titulo: string;
  children?: ReactNode;
  mesagens?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="app">
      <section className="main-content columns is fullheight">
        <Menu />
        <div className="cotainer column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">{props.titulo}</p>
              </div>
              <div className="card-content">
                {props.mesagens &&
                  props.mesagens.map((msg, index) => (
                    <Message key={index} {...msg} />
                  ))}
                <div className="content">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
