import React from 'react';
import './ExploreContainer.css';
import logo from './logo.png'
import {IonInput, IonItem, IonLabel, IonButton} from '@ionic/react';
interface ContainerProps {
  name: string;
  history: any;
}
var usr:string, pwd:string;
const ExploreContainer: React.FC<ContainerProps> = ({ name, history }) => {
  return (
    <div className="container">
      <img src={logo} width="60%"/>
      <br/><br/>
      <IonItem >
        <IonLabel position="floating" color="duop" >Usuario</IonLabel>
        <IonInput value={usr} color="duop"></IonInput>
      </IonItem>
      <br/>
      <IonItem >
        <IonLabel position="floating" color="duop" >Contraseña</IonLabel>
        <IonInput value={pwd} color="duop"></IonInput>
      </IonItem>
      <br/>
      <IonButton
        color="duop"
        mode="ios"
        onClick={
          ()=>{
            history.push('/main')
          }
        }
      >
        Ingresar
      </IonButton>
    </div>
  );
};

export default ExploreContainer;
