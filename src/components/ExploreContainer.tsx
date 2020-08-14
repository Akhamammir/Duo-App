import React, {useState} from 'react';
import './ExploreContainer.css';
import logo from './logo.png'
import {IonInput, IonItem, IonLabel, IonButton, IonToast, useIonViewDidEnter} from '@ionic/react';
import axios from 'axios';
interface ContainerProps {
  name: string;
  history: any;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, history }) => {
  const [usr, setUser] = useState<string>();
  const [pwd, setPwd] = useState<string>('');
  const [enableButton, setenableButton] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [toastMsg, settoastMsg] = useState<string>();
  const [toastColor, settoastColor] = useState<string>();
  useIonViewDidEnter( () => {
    setenableButton(true)
  } );
  return (
    <div className="container">
      <img src={logo} width="60%"/>
      <br/><br/>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message= { toastMsg }
        color= { toastColor }
        duration={1750}
      />
      <IonItem >
        <IonLabel position="floating" color="duop" >Usuario</IonLabel>
        <IonInput
          value={usr}
          color="duop"
          onIonChange={(e) => setUser(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <br/>
      <IonItem >
        <IonLabel position="floating" color="duop" >Contraseña</IonLabel>
        <IonInput
          value={pwd}
          color="duop"
          onIonChange={(e) => setPwd(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <br/>
      <IonButton
        color="duop"
        mode="ios"
        disabled = { !enableButton }
        onClick={
          ()=>{
            //history.push('/main')
            setenableButton(false)
            axios.post('http://187.190.97.136:3006/users', { usr: usr, pwd:pwd }).then(res => {
              console.log(res.data.auth)
            if (res.data.auth){
              history.push('/main')
              settoastColor("success")
              settoastMsg("Ingreso exitoso, moviendo a la app!")
              setShowToast1(true)
              setenableButton(true)
            } else {
              setenableButton(true)
              settoastColor("danger")
              settoastMsg("Usuario y contraseña no validos!")
              setShowToast1(true)
              setenableButton(true)
            }
          }).catch( error => {
            console.log(error)
            settoastColor("danger")
            settoastMsg("Hubo un error, revisa tu conexion a internet!")
            setShowToast1(true)
            setenableButton(true)
          });
            
          }
        }
      >
        Ingresar
      </IonButton>
    </div>
  );
};

export default ExploreContainer;
