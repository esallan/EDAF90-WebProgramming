Reflektionsfrågor

1: Inner är definierad inne i Outer, vilket gör att React ser den som en ny komponent varje gång Outer renderas. Att kalla Inner() direkt fungerar, men bryter mot Reacts regler eftersom komponenter ska användas via JSX. Rätt sätt är att definiera Inner utanför Outer och skicka props, så React kan hantera uppdateringar och Hooks korrekt.

2: Eftersom Inner definieras inuti Outer skapas ett nytt funktionsobjekt varje gång Outer renderas. React ser <Inner /> som en ny komponent varje gång och renderar den därför alltid om.

function Inner() { //ok om denna hade tagit name o outerState som props
return (

<div onClick={()=>setOuterState('clicked')}>
{name} {outerState}
</div>
);
}
Viktigt!: Returvärdet får bara bero på props och värden som returneras från hooks (tex state och kontext)

Ha inte komponenter nestlade!! Men eventahanterare bör ligga där
