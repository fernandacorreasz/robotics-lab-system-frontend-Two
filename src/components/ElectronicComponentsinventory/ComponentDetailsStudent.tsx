import React from 'react';
import { Card, Collapse, Button } from 'antd';

const { Panel } = Collapse;

const ComponentDetails: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>Categoria/Arduinos</h2>

      <Card style={{ marginBottom: '20px' }}>
        <img src="link-to-arduino-image" alt="Arduino Uno" style={{ width: '150px', float: 'left', marginRight: '20px' }} />
        <p>
          O Arduino é uma plataforma de prototipagem eletrônica de código aberto baseada em hardware e software flexíveis e fáceis de usar.
          Ela consiste em uma placa de circuito físico (microcontrolador) e um ambiente de desenvolvimento integrado (IDE) que roda no seu 
          computador, usado para escrever e carregar código para a placa.
        </p>
        <Button style={{ float: 'right' }}>Qtd: 30</Button>
      </Card>

      <Collapse>
        <Panel header="Acessar tutorial de uso do Arduino" key="1">
          <p>Tutorial detalhado sobre o uso do Arduino...</p>
        </Panel>
        <Panel header="Acessar ideias de projetos com o uso do Arduino" key="2">
          <p>Projetos incríveis que você pode fazer com o Arduino...</p>
        </Panel>
        <Panel header="Acessar uso de bibliotecas para Arduino Uno" key="3">
          <p>Exploração de bibliotecas para melhorar seu projeto Arduino...</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ComponentDetails;
