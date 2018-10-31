---


---

<h1 id="rpg-helper">RPG Helper!</h1>
<p>Role players !<br>
You who like to spend your evening around a table, telling stories or living them, the Dungeon Master (DM)<br>
narrating his last self-made scenario: you only want to have a good time with your friends. But sometimes,<br>
some RPG’s rules can be unclear: who can brag about following all the rules to the letter? Respecting all<br>
temporary effects or bonuses? Calculating without mistakes every time? RPG players must deal with a lot<br>
of informations during a game and it’s sometimes easy to get things mixed together.<br>
Our project, (split into a PC software for the DM and a mobile application for the player), allows to<br>
computerize some laborious processes, simplify information researches, and gather functionalities useful for<br>
the DM (such as monster or objet randomization), to ease your game nights!</p>
<p><a href="https://github.com/Kl0ven/POO_S6/blob/master/RPG%20Helper%20Jean-loup%20Monnier%20.pdf">Project’s Description (french)</a></p>
<h2 id="to-do">To Do</h2>
<ul>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled=""> <strong>Refactoring</strong></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled="">  <strong>Add offline mode for mobile app</strong></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled="">  <strong>Add offline mode for desktop app</strong></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled=""> <strong>Improve Websocket</strong></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled=""> <strong>Add generator</strong></li>
</ul>
<h2 id="refactoring">Refactoring</h2>
<p>Yeah I know  the UML design was not carry out properly. But this was due to time limitation.<br>
The main issue is the user_interface class as it was not planed and end up messy.</p>
<h2 id="add-offline-mode-for-mobile-app">Add offline mode for mobile app</h2>
<p>For now you can only fill your infos when the game is started, and that sucks!! I think it will be a better solution to be able to create characters before and load the one you want to play.</p>
<h2 id="add-offline-mode-for-desktop-app">Add offline mode for desktop app</h2>
<p>In case of the websocket broke it will be great to be able to keep going with your campaing without the mobile app.</p>
<h2 id="improve-websocket">Improve Websocket</h2>
<p>At this point WebSocket keeps crashing and i need to figure out why.</p>
<h2 id="add-generator">Add generator</h2>
<p>unfortunately the sqlite library of npm and NW.js did not want to work together, so we skip that part of the project.</p>

