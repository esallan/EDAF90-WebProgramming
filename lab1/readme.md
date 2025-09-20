**Sidan 2**

**In most programming languages a complete record of all properties would be used, for example:**
Vi behöver inte lagra egenskaper med värdet false eftersom frånvaron av en egenskap i JavaScript/TypeScript redan tolkas som "inte vald" eller "false". Det sparar minne och gör objekten enklare, och man kan ändå kontrollera om en egenskap finns.

**Sidan 4**

- enumerable = bestämmer om egenskapen ska synas i uppräkningar (typ for…in, Object.keys(), osv.).
- Det används på objekt – varje property i ett objekt kan vara enumerable eller inte.
- for (const key in salad) {
  console.log(key);
  } - detta kallas en for..in loop.
- for…in loopar över egna + ärvda properties (så länge de är enumerable).
- Object.keys() visar bara objektets egna enumerable properties
- En egenskap som inte finns direkt i objektet men som objektet ärver från sin prototyp.

- Alla objekt i JavaScript har en prototyp, och egenskaper på prototypen kan nås av objektet.

**How are classes and inherited properties represented in JavaScript?**

Answer: I JavaScript representeras klasser och ärvda egenskaper genom prototypkedjan. När en klass ärver från en annan klass (som GourmetSalad extends Salad), skapas en prototypkedja där GourmetSalad.prototype pekar på Salad.prototype. När en instans av GourmetSalad skapas, pekar dess **proto** på GourmetSalad.prototype. När JavaScript letar efter en egenskap eller metod, går den uppåt i prototypkedjan tills den hittar den eller når Object.prototype. Detta gör att ärvda metoder som price() kan åsidosättas i barnklassen medan de fortfarande är tillgängliga via Salad.prototype.price.call().

**In which object are static properties stored?**
Answer: Statiska egenskaper lagras i konstruktorfunktionen själv, inte i prototypen. Till exempel, om Salad har en statisk egenskap som instanceCounter, så lagras den i Salad.instanceCounter, inte i Salad.prototype.instanceCounter. Detta betyder att statiska egenskaper delas mellan alla instanser av klassen och ärvda klasser får tillgång till dem via konstruktorfunktionen.

**What is the value of this when a method is used as an event handler i the DOM? How is the value of this decided in a normal method call: caesarSalad.price()?**
Answer: När en metod används som event handler i DOM, blir this-värdet det element som utlöste eventet (event target), inte objektet som metoden tillhör. Detta kan orsaka problem eftersom metoden förlorar sin ursprungliga this-kontext. I en normal metodanrop som caesarSalad.price() bestäms this-värdet av hur metoden anropas - this blir objektet före punkten (mottagaren av metodanropet). JavaScript använder regler i prioritetsordning: 1) Explicit binding (call, apply, bind), 2) Implicit binding (object.method), 3) Default binding (globalt objekt eller undefined i strict mode).

**Frågor**
Vad menas med enumerable?
