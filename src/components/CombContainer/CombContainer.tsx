import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import './CombContainer.css';
import {
  IonInput, IonItem, IonLabel, IonButton, IonGrid, IonRow,
  IonCol, IonPopover, IonList, IonAvatar
} from '@ionic/react';
import axios from 'axios';
interface ContainerProps {
  name: string;
  history: any;
}
var usr: string, pwd: string;
let triggerInner = 0, trigger=0;
const CombContainer: React.FC<ContainerProps> = ({ name, history }) => {
  const [machine, setInput] = useState<string>();
  const [hnicial, setHini] = useState<string>();
  const [operador, setOper] = useState<string>();
  const [gas, setGas] = useState<string>();
  const [diesel, setDiesel] = useState<string>();
  const [list, setList] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  useEffect(() => {
    triggerInner > 0 ? (operador?.length == 0 ? console.log() : axios.get('http://duoserver.dyndns.org:3006/operadores?name=' + operador).then(res => {
      console.log(res.data.data)
      //alert(res.data.msg)
      setList(res.data.data[0])
      setShowPopover(true)
    })) : triggerInner += 1;
  }, [operador])
  useEffect(() => {
    trigger > 0 ? (machine?.length == 0 ? console.log() : axios.get('http://duoserver.dyndns.org:3006/equipos?name=' + machine).then(res => {
      console.log(res.data[0])
      //alert(res.data.msg)
      setList(res.data[0])
      setShowPopover(true)
    })) : trigger += 1;
  }, [machine])
  return (
    <div className="container">
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}
        mode="ios"
      >
        <IonList lines="none">
          {
            list.map((item: any) => {
              return (
                <IonItem
                  className="listingItem"
                  button={true}
                  onClick={() => {
                    setInput(item.Nombre)
                    setShowPopover(false)
                  }
                  }
                >
                  <IonAvatar slot="start">
                    <img src={item.picture} />
                  </IonAvatar>
                  <IonLabel>
                    <h4>{item.Nombre + ' Placas: ' + item.Placas}</h4>
                    {item.Descripcion.trim() + ' Año: ' + item.Anio}
                  </IonLabel>
                </IonItem>
              );
            }
            )
          }
        </IonList>
      </IonPopover>
      <IonGrid style={{ marginLeft: '5vw', marginRight: '5vw' }}>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel
                position="floating"
                color="duop"
              >
                Ingrese maquina
              </IonLabel>
              <IonInput
                value={machine}
                color="duop"
                debounce={450}
                onIonChange={
                  e => {
                    setInput(e.detail.value!);
                  }
                }
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem >
              <IonLabel position="floating" color="duop" >Horometro</IonLabel>
              <IonInput
                value={hnicial}
                color="duop"
                onIonChange={e => setHini(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel
                position="floating"
                color="duop"
              >
                Ingrese Operador
            </IonLabel>
              <IonInput
                value={operador}
                debounce={450}
                color="duop"
                onIonChange={e => setOper(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput
                value={gas}
                placeholder="Gasolina"
                color="duop"
                onIonChange={e => setGas(e.detail.value!)}
              ></IonInput>
              <IonLabel
                position="fixed"
                color="duop"
              >
                Lts.
            </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                value={diesel}
                placeholder="Diesel"
                color="duop"
                onIonChange={e => setDiesel(e.detail.value!)}
              ></IonInput>
              <IonLabel
                position="fixed"
                color="duop"
              >
                Lts.
            </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              color="duop"
              mode="ios"
              expand="block"
              onClick={
                () => {
                  /*axios.post('http://duoserver.dyndns.org:3006/registro?',{ContadorInicial:hnicial, ContadorFinal:hfinal,
                  HorasEfectivo: (new Date(Storage.hfinalT).getTime() - new Date(Storage.hinicialT).getTime())/3600000}).then()*/
                  //Repertir Operacion de horas, para cada una
                  //una vez q el objeto este asignado, habiliar el axios de arriba y pasar el objeto
                  
                }
              }
            >
              Aceptar
              </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default CombContainer;
