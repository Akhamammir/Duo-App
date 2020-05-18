import React from 'react';
import './MenuContainer.css';
import {IonInput, IonItem, IonLabel, IonButton} from '@ionic/react';
interface ContainerProps {
  name: string;
  history: any;
}
var usr:string, pwd:string;
const MenuContainer: React.FC<ContainerProps> = ({ name, history }) => {
  return (
    <div className="container">
      <br/>
      <IonButton
        color="duop"
        mode="ios"
        onClick={
          ()=>{
            history.push('/main/a')
          }
        }
      >
        Registro de Operaciones
      </IonButton>
      <br/><br/><br/>
      <IonButton
        color="duop"
        mode="ios"
        onClick={
          ()=>{
            history.push('/main')
          }
        }
      >
        Registro de Combustible
      </IonButton>
    </div>
  );
};

export default MenuContainer;