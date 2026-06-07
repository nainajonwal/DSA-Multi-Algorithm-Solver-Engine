window.onload = loadDashboard;

const topics = [
    "Knapsack (DP)",
    "Longest Common Subsequence",
    "Dijkstra Algorithm",
    "Kruskal Algorithm",
    "Graph Coloring",
    "N-Queens",
    "Greedy Method",
    "Hashing"
];

/* =============================================================
   DASHBOARD
   ============================================================= */
function loadDashboard() {
    let html = "";

    /* --- Smart Solver --- */
    html += `<div class="section-title">Smart Problem Solver</div>
    <div class="smart-solver-box">
        <p>Describe your problem in plain words. The engine will identify the correct algorithm, explain why it fits, and let you solve it directly.</p>
        <textarea id="smartInput" placeholder="Examples: find shortest path between cities, maximize profit within a budget limit, compare two gene sequences, connect all cities at minimum cost..."></textarea><br>
        <button class="btn" onclick="runSmartSolver()">Identify Algorithm</button>
        <div id="smartResult"></div>
    </div>`;

    /* --- Real-Life Problem Solver --- */
    html += `<div class="section-title">Real-Life Problem Solver</div>
    <div class="reallife-box">
        <p class="subtitle">Select a real-world problem. Enter actual data. The correct algorithm runs and shows you the solution with context.</p>
        <div class="rl-problem-grid">
            <div class="rl-problem-card" onclick="openRLSolver('route')">
                <div class="rl-title">Find Shortest Route</div>
                <div class="rl-algo">Dijkstra Algorithm</div>
            </div>
            <div class="rl-problem-card" onclick="openRLSolver('budget')">
                <div class="rl-title">Optimize Shopping Budget</div>
                <div class="rl-algo">Knapsack (DP)</div>
            </div>
            <div class="rl-problem-card" onclick="openRLSolver('strings')">
                <div class="rl-title">Compare Two Sequences</div>
                <div class="rl-algo">Longest Common Subsequence</div>
            </div>
            <div class="rl-problem-card" onclick="openRLSolver('network')">
                <div class="rl-title">Connect Cities at Minimum Cost</div>
                <div class="rl-algo">Kruskal Algorithm</div>
            </div>
        </div>
        <div id="rlPanel"></div>
    </div>`;

    /* --- Algorithm Comparison --- */
    html += `<div class="section-title">Algorithm Comparison</div>
    <div class="compare-box">
        <p>Select a problem category to compare relevant algorithms by complexity, approach, and use-case.</p>
        <select id="compareSelect">
            <option value="">-- Select Problem Type --</option>
            <option value="shortest_path">Shortest Path</option>
            <option value="optimization">Optimization / Maximization</option>
            <option value="sequence">Sequence Matching</option>
            <option value="spanning_tree">Minimum Spanning Tree</option>
            <option value="constraint">Constraint Satisfaction</option>
            <option value="lookup">Fast Lookup / Storage</option>
        </select>
        <button class="btn" onclick="showComparison()">Compare</button>
        <div id="compareResult"></div>
    </div>`;

    /* --- Learn --- */
    html += `<div class="section-title">Learn Concepts</div><div class="grid">`;
    topics.forEach(t => {
        html += `<div class="card" onclick="openConcept('${t}')">${t}</div>`;
    });
    html += `</div>`;

    /* --- Solve --- */
    html += `<div class="section-title">Solve Problems</div><div class="grid">`;
    topics.forEach(t => {
        html += `<div class="card" onclick="openSolver('${t}')">${t}</div>`;
    });
    html += `</div>`;

    /* --- Quiz --- */
    html += `<div class="section-title">Practice Quiz</div><div class="grid">`;
    topics.forEach(t => {
        html += `<div class="card" onclick="startQuiz('${t}')">${t}</div>`;
    });
    html += `</div>`;

    document.getElementById("mainContent").innerHTML = html;
}

/* =============================================================
   SMART SOLVER  (keyword scoring — 8 algorithms only, precise)
   ============================================================= */
const smartRules = [
    {
        keywords: ["shortest path","shortest route","minimum distance","shortest distance",
                   "route","navigation","maps","gps","road network","network path",
                   "travel time","least cost path","path between","path from"],
        algorithm: "Dijkstra Algorithm",
        solverTopic: "Dijkstra Algorithm",
        reason: "Your problem is about finding the minimum-cost path between two or more nodes in a weighted graph. Dijkstra's algorithm uses a greedy approach to expand the closest unvisited node first, guaranteeing the shortest path in graphs with non-negative edge weights.",
        complexity: "O(V^2) with adjacency matrix  |  O(E log V) with priority queue",
        paradigm: "Greedy",
        usedIn: "GPS navigation, network routing protocols, airline route planning"
    },
    {
        keywords: ["maximize profit","maximum value","weight limit","capacity constraint",
                   "knapsack","budget constraint","select items","best items",
                   "maximize value","profit within","most value","pick items"],
        algorithm: "Knapsack (DP)",
        solverTopic: "Knapsack (DP)",
        reason: "Your problem involves selecting a subset of items, each with a weight and a value, such that total weight stays within a limit and total value is maximized. This is the 0/1 Knapsack problem solved with dynamic programming by building a table of optimal sub-solutions.",
        complexity: "O(n * W)  where n = items, W = capacity",
        paradigm: "Dynamic Programming",
        usedIn: "Investment portfolio selection, resource allocation, cargo loading"
    },
    {
        keywords: ["common subsequence","longest common","compare sequences","dna matching",
                   "gene comparison","string similarity","lcs","common characters",
                   "match sequences","sequence comparison","two strings common","diff"],
        algorithm: "Longest Common Subsequence",
        solverTopic: "Longest Common Subsequence",
        reason: "Your problem requires finding the longest sequence of elements that appears in the same relative order in two given sequences. LCS uses dynamic programming to build a 2D table comparing each pair of characters systematically.",
        complexity: "O(n * m)  where n, m are the lengths of the two sequences",
        paradigm: "Dynamic Programming",
        usedIn: "DNA sequence analysis, file diff tools (git diff), plagiarism detection"
    },
    {
        keywords: ["minimum spanning tree","mst","connect all nodes","connect all cities",
                   "cheapest network","minimum cost network","pipeline","cable laying",
                   "wiring","least cost to connect","spanning tree","kruskal"],
        algorithm: "Kruskal Algorithm",
        solverTopic: "Kruskal Algorithm",
        reason: "Your problem requires connecting all nodes in a graph with the minimum total edge weight and no cycles. Kruskal's algorithm sorts all edges by weight and greedily adds the smallest edge that does not form a cycle, using a Union-Find structure to detect cycles.",
        complexity: "O(E log E)  where E = number of edges",
        paradigm: "Greedy",
        usedIn: "Telecommunication cable networks, electric power grid design, road construction"
    },
    {
        keywords: ["graph coloring","color graph","assign colors","no adjacent same color",
                   "exam schedule","timetable scheduling","frequency assignment",
                   "register allocation","color vertices","vertex coloring","conflict free assignment"],
        algorithm: "Graph Coloring",
        solverTopic: "Graph Coloring",
        reason: "Your problem involves assigning labels (colors) to graph vertices such that no two adjacent vertices share the same label. This is solved using backtracking — trying each color for each vertex and backtracking when a conflict is detected.",
        complexity: "O(m^V)  where m = number of colors, V = vertices",
        paradigm: "Backtracking",
        usedIn: "Exam timetabling, compiler register allocation, frequency assignment in wireless networks"
    },
    {
        keywords: ["n queens","place queens","queens on board","chessboard placement",
                   "no attack","non attacking","queens problem","place n","arrangement on board"],
        algorithm: "N-Queens",
        solverTopic: "N-Queens",
        reason: "Your problem involves placing N entities on an N×N grid such that no two share a row, column, or diagonal. This is the N-Queens problem solved by backtracking — placing one queen per column and backtracking when a safe position cannot be found.",
        complexity: "O(N!)  in the worst case",
        paradigm: "Backtracking",
        usedIn: "VLSI circuit layout, parallel memory access optimization, constraint scheduling"
    },
    {
        keywords: ["coin change","minimum coins","fewest notes","cash dispensing",
                   "change making","denominations","make change","atm","vending machine",
                   "greedy selection","smallest number of coins","activity selection"],
        algorithm: "Greedy Method",
        solverTopic: "Greedy Method",
        reason: "Your problem can be solved by always choosing the locally best option at each step. For coin change, this means always picking the largest denomination that fits. The greedy approach works when the problem has the greedy-choice property.",
        complexity: "O(n log n)  for sorting + O(amount) for selection",
        paradigm: "Greedy",
        usedIn: "ATM cash dispensing, vending machines, scheduling problems with deadlines"
    },
    {
        keywords: ["fast lookup","hash table","store and retrieve","key value","dictionary",
                   "database index","search in constant","hashing","hash function",
                   "collision","linear probing","symbol table","cache","fast search"],
        algorithm: "Hashing",
        solverTopic: "Hashing",
        reason: "Your problem requires storing data and retrieving it by a key in near-constant time. A hash table uses a hash function to map keys to indices. When two keys map to the same index (collision), linear probing finds the next available slot.",
        complexity: "O(1) average  |  O(n) worst case",
        paradigm: "Hashing",
        usedIn: "Database indexing, compiler symbol tables, password verification, caching"
    }
];

function runSmartSolver() {
    const input = document.getElementById("smartInput").value.toLowerCase().trim();
    const resultDiv = document.getElementById("smartResult");

    if (!input) {
        resultDiv.innerHTML = `<div class="smart-result-card"><p style="color:#dc2626">Please describe your problem first.</p></div>`;
        return;
    }

    let best = null;
    let maxScore = 0;

    for (const rule of smartRules) {
        let score = 0;
        for (const kw of rule.keywords) {
            if (input.includes(kw)) score += kw.split(" ").length; // multi-word keywords score higher
        }
        if (score > maxScore) { maxScore = score; best = rule; }
    }

    if (!best || maxScore === 0) {
        resultDiv.innerHTML = `
            <div class="smart-result-card">
                <h3>Could not identify a specific algorithm</h3>
                <p>Try describing with keywords such as: shortest path, maximize profit, compare sequences, connect cities, assign colors, place queens, coin change, fast lookup.</p>
            </div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div class="smart-result-card">
            <h3>Recommended: ${best.algorithm}</h3>
            <p><strong>Why this algorithm:</strong> ${best.reason}</p>
            <p style="margin-top:10px">
                <span class="tag tag-blue">Time: ${best.complexity}</span>
                <span class="tag tag-green">Paradigm: ${best.paradigm}</span>
                <span class="tag tag-orange">Used in: ${best.usedIn}</span>
            </p>
            <div style="margin-top:14px">
                <button class="btn" onclick="openSolver('${best.solverTopic}')">Solve Now</button>
                <button class="btn btn-green" onclick="openConcept('${best.solverTopic}')">Learn Concept</button>
            </div>
        </div>`;
}

/* =============================================================
   REAL-LIFE PROBLEM SOLVER
   ============================================================= */
function openRLSolver(type) {
    // highlight selected card
    document.querySelectorAll(".rl-problem-card").forEach(c => c.classList.remove("selected"));
    event.currentTarget.classList.add("selected");

    const panel = document.getElementById("rlPanel");

    const templates = {
        route: `
            <div class="rl-solver-panel">
                <h4>Find Shortest Route  —  Dijkstra Algorithm</h4>
                <p style="font-size:13px;color:#64748b;margin:0 0 14px">Enter the number of locations and the distance matrix. Use 0 where no direct road exists.</p>
                <label>Number of locations:</label>
                <input type="number" id="rl_n" placeholder="e.g. 4" onchange="buildRLMatrix()" style="width:120px;display:inline-block;margin-left:8px"><br><br>
                <div id="rl_matrix_area"></div>
                <div id="rl_location_names" style="margin-bottom:12px"></div>
                <button class="btn" onclick="runRL_Dijkstra()">Find Shortest Route</button>
                <div class="rl-output" id="rl_output" style="display:none"></div>
            </div>`,
        budget: `
            <div class="rl-solver-panel">
                <h4>Optimize Shopping Budget  —  Knapsack (DP)</h4>
                <p style="font-size:13px;color:#64748b;margin:0 0 14px">Enter your budget and the items you are considering buying (cost and value/importance score).</p>
                <label>Total budget (Rs):</label>
                <input type="number" id="rl_budget" placeholder="e.g. 100" style="width:200px;display:inline-block;margin-left:8px"><br><br>
                <label>Number of items:</label>
                <input type="number" id="rl_items_n" placeholder="e.g. 4" style="width:200px;display:inline-block;margin-left:8px"><br><br>
                <label>Items (one per line: Name Cost Value):</label><br>
                <textarea id="rl_items_data" placeholder="Book 30 50&#10;Pen 10 20&#10;Bag 60 80&#10;Notebook 20 35" style="width:400px;height:110px"></textarea><br>
                <button class="btn" onclick="runRL_Knapsack()">Find Best Items to Buy</button>
                <div class="rl-output" id="rl_output" style="display:none"></div>
            </div>`,
        strings: `
            <div class="rl-solver-panel">
                <h4>Compare Two Sequences  —  Longest Common Subsequence</h4>
                <p style="font-size:13px;color:#64748b;margin:0 0 14px">Compare two DNA sequences, text versions, or any two strings to find their longest common subsequence.</p>
                <label>First sequence (e.g. DNA strand A):</label><br>
                <input type="text" id="rl_s1" placeholder="e.g. AGGTAB" style="width:400px"><br>
                <label>Second sequence (e.g. DNA strand B):</label><br>
                <input type="text" id="rl_s2" placeholder="e.g. GXTXAYB" style="width:400px"><br>
                <button class="btn" onclick="runRL_LCS()">Find Common Subsequence</button>
                <div class="rl-output" id="rl_output" style="display:none"></div>
            </div>`,
        network: `
            <div class="rl-solver-panel">
                <h4>Connect Cities at Minimum Cost  —  Kruskal Algorithm</h4>
                <p style="font-size:13px;color:#64748b;margin:0 0 14px">Enter the cities (nodes) and the available road connections with their costs. The engine finds the minimum cost to connect all cities.</p>
                <label>Number of cities:</label>
                <input type="number" id="rl_cities" placeholder="e.g. 4" style="width:160px;display:inline-block;margin-left:8px"><br><br>
                <label>Number of roads available:</label>
                <input type="number" id="rl_roads" placeholder="e.g. 5" style="width:160px;display:inline-block;margin-left:8px"><br><br>
                <label>Roads (one per line: City1 City2 Cost):</label><br>
                <textarea id="rl_roads_data" placeholder="0 1 4&#10;0 2 8&#10;1 2 6&#10;1 3 5&#10;2 3 3" style="width:400px;height:120px"></textarea><br>
                <button class="btn" onclick="runRL_Kruskal()">Find Minimum Cost Network</button>
                <div class="rl-output" id="rl_output" style="display:none"></div>
            </div>`
    };

    panel.innerHTML = templates[type] || "";
}

function buildRLMatrix() {
    const n = parseInt(document.getElementById("rl_n").value);
    if (!n || n < 2 || n > 10) return;

    let nameHtml = "<label>Location names (optional, comma separated):</label><br>";
    nameHtml += `<input type="text" id="rl_loc_names" placeholder="A, B, C, D" style="width:320px"><br><br>`;

    let matHtml = "<label>Distance matrix (enter 0 if no direct road):</label><br>";
    matHtml += "<table style='border-collapse:separate;border-spacing:4px'><tr><td></td>";
    for (let j = 0; j < n; j++) matHtml += `<td style="text-align:center;font-size:12px;color:#64748b">L${j}</td>`;
    matHtml += "</tr>";
    for (let i = 0; i < n; i++) {
        matHtml += `<tr><td style="font-size:12px;color:#64748b;padding-right:4px">L${i}</td>`;
        for (let j = 0; j < n; j++) {
            matHtml += `<td><input type="number" id="rlcell_${i}_${j}" value="0" style="width:52px;padding:5px;margin:0;text-align:center"></td>`;
        }
        matHtml += "</tr>";
    }
    matHtml += "</table><br>";

    document.getElementById("rl_location_names").innerHTML = nameHtml;
    document.getElementById("rl_matrix_area").innerHTML = matHtml;
}

function runRL_Dijkstra() {
    const n = parseInt(document.getElementById("rl_n").value);
    const out = document.getElementById("rl_output");

    if (!n || n < 2) { showRL("Please enter the number of locations and fill the distance matrix."); return; }

    const namesRaw = document.getElementById("rl_loc_names") ? document.getElementById("rl_loc_names").value : "";
    let names = namesRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);
    if (names.length < n) {
        names = [];
        for (let i = 0; i < n; i++) names.push("Location " + i);
    }

    const graph = [];
    for (let i = 0; i < n; i++) {
        graph[i] = [];
        for (let j = 0; j < n; j++) {
            const v = document.getElementById(`rlcell_${i}_${j}`);
            graph[i][j] = v ? (parseInt(v.value) || 0) : 0;
        }
    }

    const dist = new Array(n).fill(Infinity);
    const vis = new Array(n).fill(false);
    const prev = new Array(n).fill(-1);
    dist[0] = 0;

    for (let i = 0; i < n - 1; i++) {
        let u = -1, mn = Infinity;
        for (let j = 0; j < n; j++) {
            if (!vis[j] && dist[j] < mn) { mn = dist[j]; u = j; }
        }
        if (u === -1) break;
        vis[u] = true;
        for (let v = 0; v < n; v++) {
            if (!vis[v] && graph[u][v] > 0 && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                prev[v] = u;
            }
        }
    }

    function getPath(dest) {
        if (prev[dest] === -1 && dest !== 0) return null;
        const path = [];
        let cur = dest;
        while (cur !== -1) { path.unshift(names[cur]); cur = prev[cur]; }
        return path.join(" → ");
    }

    let html = "<strong>Shortest distances from " + names[0] + ":</strong><br><br>";
    html += "<table><tr><th>Destination</th><th>Shortest Distance</th><th>Route</th></tr>";
    for (let i = 1; i < n; i++) {
        const path = getPath(i);
        html += `<tr><td>${names[i]}</td><td>${dist[i] === Infinity ? "Unreachable" : dist[i]}</td><td>${path || "No route"}</td></tr>`;
    }
    html += "</table>";
    html += "<br><strong>Algorithm used:</strong> Dijkstra's Algorithm &nbsp;|&nbsp; <strong>Used in:</strong> GPS systems, Google Maps, network routing";
    showRL(html);
}

function runRL_Knapsack() {
    const budget = parseInt(document.getElementById("rl_budget").value);
    const nItems = parseInt(document.getElementById("rl_items_n").value);
    const raw = document.getElementById("rl_items_data").value.trim().split("\n");

    if (!budget || !nItems || raw.length < nItems) {
        showRL("Please fill in budget, number of items, and item data correctly.");
        return;
    }

    const items = [];
    for (let i = 0; i < nItems; i++) {
        const parts = raw[i].trim().split(/\s+/);
        if (parts.length < 3) { showRL("Each item line must be: Name Cost Value"); return; }
        items.push({ name: parts[0], cost: parseInt(parts[1]), value: parseInt(parts[2]) });
    }

    const n = items.length;
    const W = budget;
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (items[i - 1].cost <= w)
                dp[i][w] = Math.max(items[i - 1].value + dp[i - 1][w - items[i - 1].cost], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }

    // Traceback
    const chosen = [];
    let w = W;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            chosen.push(items[i - 1]);
            w -= items[i - 1].cost;
        }
    }

    let html = `<strong>Budget:</strong> Rs ${budget} &nbsp;|&nbsp; <strong>Maximum Value Achievable:</strong> ${dp[n][W]}<br><br>`;
    html += "<strong>Items to buy:</strong><br>";
    html += "<table><tr><th>Item</th><th>Cost (Rs)</th><th>Value Score</th></tr>";
    chosen.reverse().forEach(it => {
        html += `<tr><td>${it.name}</td><td>${it.cost}</td><td>${it.value}</td></tr>`;
    });
    html += "</table>";
    const totalCost = chosen.reduce((s, it) => s + it.cost, 0);
    html += `<br><strong>Total cost spent:</strong> Rs ${totalCost} &nbsp;|&nbsp; <strong>Budget remaining:</strong> Rs ${budget - totalCost}`;
    html += "<br><br><strong>Algorithm used:</strong> 0/1 Knapsack — Dynamic Programming &nbsp;|&nbsp; <strong>Used in:</strong> Resource allocation, portfolio optimization";
    showRL(html);
}

function runRL_LCS() {
    const s1 = document.getElementById("rl_s1").value.trim().toUpperCase();
    const s2 = document.getElementById("rl_s2").value.trim().toUpperCase();

    if (!s1 || !s2) { showRL("Please enter both sequences."); return; }

    const n = s1.length, m = s2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    let lcs = "";
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) { lcs = s1[i - 1] + lcs; i--; j--; }
        else if (dp[i - 1][j] > dp[i][j - 1]) i--;
        else j--;
    }

    const similarity = ((dp[n][m] / Math.max(n, m)) * 100).toFixed(1);

    let html = `<strong>Sequence 1:</strong> ${s1}<br><strong>Sequence 2:</strong> ${s2}<br><br>`;
    html += `<strong>Longest Common Subsequence:</strong> ${lcs || "(none)"}<br>`;
    html += `<strong>LCS Length:</strong> ${dp[n][m]} characters<br>`;
    html += `<strong>Similarity Score:</strong> ${similarity}%<br><br>`;
    html += "<strong>Algorithm used:</strong> LCS — Dynamic Programming &nbsp;|&nbsp; <strong>Used in:</strong> DNA analysis, git diff, plagiarism detection";
    showRL(html);
}

function runRL_Kruskal() {
    const nCities = parseInt(document.getElementById("rl_cities").value);
    const nRoads = parseInt(document.getElementById("rl_roads").value);
    const raw = document.getElementById("rl_roads_data").value.trim().split("\n");

    if (!nCities || !nRoads || raw.length < nRoads) {
        showRL("Please fill in number of cities, roads, and road data correctly.");
        return;
    }

    const edges = [];
    for (const line of raw.slice(0, nRoads)) {
        const parts = line.trim().split(/\s+/);
        if (parts.length < 3) { showRL("Each line must be: City1 City2 Cost"); return; }
        edges.push([parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])]);
    }

    edges.sort((a, b) => a[2] - b[2]);

    const parent = Array.from({ length: nCities }, (_, i) => i);
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }

    let totalCost = 0;
    const mstEdges = [];

    for (const [u, v, w] of edges) {
        const pu = find(u), pv = find(v);
        if (pu !== pv) {
            totalCost += w;
            mstEdges.push([u, v, w]);
            parent[pu] = pv;
        }
    }

    let html = `<strong>Minimum cost network connects ${nCities} cities using ${mstEdges.length} roads:</strong><br><br>`;
    html += "<table><tr><th>From City</th><th>To City</th><th>Road Cost</th></tr>";
    mstEdges.forEach(([u, v, w]) => {
        html += `<tr><td>City ${u}</td><td>City ${v}</td><td>${w}</td></tr>`;
    });
    html += `</table><br><strong>Total minimum connection cost:</strong> ${totalCost}`;
    html += "<br><br><strong>Algorithm used:</strong> Kruskal — Minimum Spanning Tree &nbsp;|&nbsp; <strong>Used in:</strong> Telecom cable networks, power grid, road construction";
    showRL(html);
}

function showRL(html) {
    const out = document.getElementById("rl_output");
    if (out) {
        out.style.display = "block";
        out.innerHTML = html;
    }
}

/* =============================================================
   ALGORITHM COMPARISON
   ============================================================= */
function showComparison() {
    const type = document.getElementById("compareSelect").value;

    const data = {
        shortest_path: [
            { name: "Dijkstra's Algorithm", time: "O(V²)", space: "O(V)", paradigm: "Greedy", badge: "badge-greedy", use: "Single-source shortest path, non-negative weights only" },
            { name: "Bellman-Ford", time: "O(V*E)", space: "O(V)", paradigm: "DP", badge: "badge-dp", use: "Single-source shortest path, supports negative weights" },
            { name: "Floyd-Warshall", time: "O(V³)", space: "O(V²)", paradigm: "DP", badge: "badge-dp", use: "All-pairs shortest path" }
        ],
        optimization: [
            { name: "0/1 Knapsack (DP)", time: "O(n*W)", space: "O(n*W)", paradigm: "DP", badge: "badge-dp", use: "Maximize value under weight constraint, items are indivisible" },
            { name: "Fractional Knapsack", time: "O(n log n)", space: "O(1)", paradigm: "Greedy", badge: "badge-greedy", use: "Items can be split; always gives optimal result greedily" },
            { name: "Greedy Coin Change", time: "O(n log n)", space: "O(1)", paradigm: "Greedy", badge: "badge-greedy", use: "Minimum coins for an amount using standard denominations" }
        ],
        sequence: [
            { name: "LCS (DP)", time: "O(n*m)", space: "O(n*m)", paradigm: "DP", badge: "badge-dp", use: "Longest shared subsequence between two strings" },
            { name: "Edit Distance (DP)", time: "O(n*m)", space: "O(n*m)", paradigm: "DP", badge: "badge-dp", use: "Minimum insertions/deletions/substitutions to convert one string to another" },
            { name: "Naive String Matching", time: "O(n*m)", space: "O(1)", paradigm: "Brute Force", badge: "badge-back", use: "Find pattern in text; simple but slow for large inputs" }
        ],
        spanning_tree: [
            { name: "Kruskal's Algorithm", time: "O(E log E)", space: "O(V)", paradigm: "Greedy", badge: "badge-greedy", use: "Sparse graphs; works on edge list; uses Union-Find" },
            { name: "Prim's Algorithm", time: "O(V²)", space: "O(V)", paradigm: "Greedy", badge: "badge-greedy", use: "Dense graphs; grows MST from a starting vertex" }
        ],
        constraint: [
            { name: "N-Queens (Backtracking)", time: "O(N!)", space: "O(N)", paradigm: "Backtracking", badge: "badge-back", use: "Place N queens on N×N board with no conflicts" },
            { name: "Graph Coloring (Backtracking)", time: "O(m^V)", space: "O(V)", paradigm: "Backtracking", badge: "badge-back", use: "Color vertices so no two adjacent vertices share a color" }
        ],
        lookup: [
            { name: "Hashing (Linear Probing)", time: "O(1) avg", space: "O(n)", paradigm: "Hashing", badge: "badge-hash", use: "Fast key-value storage and retrieval; O(1) on average" },
            { name: "Binary Search Tree", time: "O(log n) avg", space: "O(n)", paradigm: "Tree", badge: "badge-dp", use: "Ordered data with insert, search, range queries" },
            { name: "Linear Search", time: "O(n)", space: "O(1)", paradigm: "Brute Force", badge: "badge-back", use: "Unsorted small lists; no preprocessing required" }
        ]
    };

    if (!type) {
        document.getElementById("compareResult").innerHTML = "<p style='color:#dc2626;font-size:14px'>Please select a problem type first.</p>";
        return;
    }

    const rows = data[type];
    let html = "<table class='compare-table'><tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Paradigm</th><th>Best Used When</th></tr>";
    rows.forEach(r => {
        html += `<tr><td><strong>${r.name}</strong></td><td><code>${r.time}</code></td><td><code>${r.space}</code></td><td><span class="badge ${r.badge}">${r.paradigm}</span></td><td>${r.use}</td></tr>`;
    });
    html += "</table>";
    document.getElementById("compareResult").innerHTML = html;
}


/* =============================================================
   LEARN  —  beginner-friendly theory with simple diagrams
   ============================================================= */
function openConcept(topic) {
    const pages = {

/* ---- 1. KNAPSACK ---- */
"Knapsack (DP)": `
<div class="theory-page">
  <h2>Knapsack (Dynamic Programming)</h2>
  <span class="algo-tag">Dynamic Programming</span>

  <h3>What is it? </h3>
  <p>You have a bag with a weight limit and a set of items. Each item has a weight and a value. You want to fill the bag to get the <strong>maximum value</strong> without exceeding the weight limit. You cannot cut items — either take the whole item or skip it.</p>

  <h3>Quick Example</h3>
  <p>Bag limit = <strong>5 kg</strong></p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#dbeafe;border-radius:8px;padding:12px;text-align:center;border:2px solid #2563eb;min-width:90px">
      <div style="font-weight:700">Item A</div>
      <div style="font-size:13px">2 kg | Rs 6</div>
    </div>
    <div style="background:#dcfce7;border-radius:8px;padding:12px;text-align:center;border:2px solid #16a34a;min-width:90px">
      <div style="font-weight:700">Item B</div>
      <div style="font-size:13px">3 kg | Rs 10</div>
    </div>
    <div style="background:#fef9c3;border-radius:8px;padding:12px;text-align:center;border:2px solid #ca8a04;min-width:90px">
      <div style="font-weight:700">Item C</div>
      <div style="font-size:13px">4 kg | Rs 12</div>
    </div>
    <div style="background:#f0f7ff;border-radius:8px;padding:12px;border:2px solid #64748b;min-width:110px;display:flex;align-items:center">
      <div><div style="font-weight:700;color:#1e3c72">Best pick:</div><div style="font-size:13px">A + B = 5 kg, Rs 16</div></div>
    </div>
  </div>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Build a table: rows = items, columns = capacity 0 to W.</div>
    <div>2. For each item and each capacity, decide: <strong>take item</strong> or <strong>skip it</strong>.</div>
    <div>3. Take item if its weight fits AND value gained is better.</div>
    <div>4. Formula: dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w - weight[i]])</div>
    <div>5. Answer = bottom-right cell of the table.</div>
  </div>

  <h3>DP Table Diagram (W = 5)</h3>
  <div style="overflow-x:auto;margin:12px 0">
    <table style="border-collapse:collapse;font-size:13px;min-width:340px">
      <tr>
        <th style="background:#1e3c72;color:white;padding:7px 10px">Item / Cap</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">0</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">1</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">2</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">3</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">4</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">5</th>
      </tr>
      <tr><td style="padding:7px 10px;font-weight:700;border-bottom:1px solid #e2e8f0">None</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td></tr>
      <tr><td style="padding:7px 10px;font-weight:700;border-bottom:1px solid #e2e8f0">A(2,6)</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dbeafe">6</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dbeafe">6</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dbeafe">6</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dbeafe">6</td></tr>
      <tr><td style="padding:7px 10px;font-weight:700;border-bottom:1px solid #e2e8f0">B(3,10)</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0">0</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dcfce7">6</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dcfce7">10</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dcfce7">10</td><td style="text-align:center;padding:7px 10px;border-bottom:1px solid #e2e8f0;background:#dcfce7">16</td></tr>
      <tr><td style="padding:7px 10px;font-weight:700">C(4,12)</td><td style="text-align:center;padding:7px 10px">0</td><td style="text-align:center;padding:7px 10px">0</td><td style="text-align:center;padding:7px 10px;background:#fef9c3">6</td><td style="text-align:center;padding:7px 10px;background:#fef9c3">10</td><td style="text-align:center;padding:7px 10px;background:#fef9c3">12</td><td style="text-align:center;padding:7px 10px;background:#dcfce7;font-weight:700;color:#15803d">16</td></tr>
    </table>
  </div>
  <p style="font-size:12px;color:#64748b">Answer = bottom-right = Rs 16. Take A + B (5 kg total).</p>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(n × W) — n items, W = bag capacity</div>
    <div><strong>Space:</strong> O(n × W) — for the DP table</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Shopping within a budget</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Cargo loading in ships</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Investment portfolio selection</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Knapsack (DP)')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 2. LCS ---- */
"Longest Common Subsequence": `
<div class="theory-page">
  <h2>Longest Common Subsequence (LCS)</h2>
  <span class="algo-tag">Dynamic Programming</span>

  <h3>What is it? </h3>
  <p>Given two strings, find the <strong>longest sequence of characters</strong> that appears in both strings <strong>in the same order</strong>. Characters do not have to be next to each other — they just have to maintain their relative order.</p>

  <h3>Subsequence vs Substring</h3>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#dbeafe;border-radius:8px;padding:12px 16px;flex:1;min-width:150px">
      <div style="font-weight:700;color:#1d4ed8;margin-bottom:4px">Subsequence</div>
      <div style="font-size:13px">Characters can be skipped. Order is maintained.<br><em>"ACE" from "ABCDE" ✓</em></div>
    </div>
    <div style="background:#fce7f3;border-radius:8px;padding:12px 16px;flex:1;min-width:150px">
      <div style="font-weight:700;color:#9d174d;margin-bottom:4px">Substring</div>
      <div style="font-size:13px">Characters must be continuous.<br><em>"BCD" from "ABCDE" ✓<br>"ACE" from "ABCDE" ✗</em></div>
    </div>
  </div>

  <h3>Quick Example</h3>
  <p>S1 = <strong>ABCD</strong> &nbsp; S2 = <strong>ACBD</strong></p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0;align-items:center">
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">A</span>
    <span style="background:#e2e8f0;padding:5px 10px;border-radius:5px">B</span>
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">C</span>
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">D</span>
    <span style="font-size:13px;color:#64748b;margin-left:8px">← S1 (blue = matched)</span>
  </div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0;align-items:center">
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">A</span>
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">C</span>
    <span style="background:#e2e8f0;padding:5px 10px;border-radius:5px">B</span>
    <span style="background:#dbeafe;padding:5px 10px;border-radius:5px;font-weight:700">D</span>
    <span style="font-size:13px;color:#64748b;margin-left:8px">← S2 (blue = matched)</span>
  </div>
  <div style="background:#dcfce7;border-radius:7px;padding:8px 14px;font-size:13px;color:#15803d;font-weight:700;display:inline-block;margin-top:6px">LCS = ACD &nbsp;(length 3)</div>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Create a 2D table dp[n+1][m+1], filled with 0.</div>
    <div>2. For each pair (i, j): if S1[i] == S2[j] → dp[i][j] = dp[i-1][j-1] + 1</div>
    <div>3. Else → dp[i][j] = max(dp[i-1][j], dp[i][j-1])</div>
    <div>4. Answer = dp[n][m] (bottom-right cell).</div>
    <div>5. Traceback diagonally to reconstruct the actual LCS string.</div>
  </div>

  <h3>LCS Table Diagram (ABCD vs ACBD)</h3>
  <div style="overflow-x:auto;margin:12px 0">
    <table style="border-collapse:collapse;font-size:13px">
      <tr>
        <th style="background:#1e3c72;color:white;padding:7px 10px"> </th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">_</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">A</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">C</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">B</th>
        <th style="background:#1e3c72;color:white;padding:7px 10px">D</th>
      </tr>
      <tr><th style="background:#1e3c72;color:white;padding:7px 10px">_</th><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td></tr>
      <tr><th style="background:#1e3c72;color:white;padding:7px 10px">A</th><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td></tr>
      <tr><th style="background:#1e3c72;color:white;padding:7px 10px">B</th><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#dbeafe">2</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">2</td></tr>
      <tr><th style="background:#1e3c72;color:white;padding:7px 10px">C</th><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#dbeafe">2</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">2</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">2</td></tr>
      <tr><th style="background:#1e3c72;color:white;padding:7px 10px">D</th><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0">0</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">1</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">2</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#f8fafc">2</td><td style="padding:7px 10px;text-align:center;border:1px solid #e2e8f0;background:#dcfce7;font-weight:700;color:#15803d">3</td></tr>
    </table>
  </div>
  <p style="font-size:12px;color:#64748b">Bottom-right = 3. LCS length = 3. Trace back to get "ACD".</p>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(n × m) — n and m are lengths of the two strings</div>
    <div><strong>Space:</strong> O(n × m) — for the DP table</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">DNA sequence comparison in biology</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Git diff — showing file changes</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Plagiarism detection</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Longest Common Subsequence')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 3. DIJKSTRA ---- */
"Dijkstra Algorithm": `
<div class="theory-page">
  <h2>Dijkstra's Algorithm</h2>
  <span class="algo-tag">Greedy</span>

  <h3>What is it? </h3>
  <p>Dijkstra's algorithm finds the <strong>shortest distance</strong> from one starting node to all other nodes in a graph with non-negative edge weights. Think of it as Google Maps finding the fastest route from your location to every other place in the city.</p>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Set distance of start node = 0, all others = infinity (∞).</div>
    <div>2. Pick the unvisited node with the smallest distance.</div>
    <div>3. For each neighbor: if current dist + edge weight is smaller than known dist, update it.</div>
    <div>4. Mark that node as visited. Never revisit it.</div>
    <div>5. Repeat until all nodes are visited.</div>
  </div>

  <h3>Graph Diagram — Shortest paths from Node 0</h3>
  <div style="text-align:center;margin:14px 0">
    <svg viewBox="0 0 440 190" style="width:100%;max-width:440px;font-family:Segoe UI,sans-serif">
      <!-- edges -->
      <line x1="70" y1="95" x2="200" y2="38" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="70" y1="95" x2="200" y2="152" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="200" y1="38" x2="330" y2="38" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="200" y1="38" x2="330" y2="152" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="200" y1="38" x2="200" y2="152" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="200" y1="152" x2="330" y2="152" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="330" y1="38" x2="390" y2="95" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="330" y1="152" x2="390" y2="95" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- edge weights -->
      <text x="126" y="54" font-size="12" fill="#1d4ed8" font-weight="bold">4</text>
      <text x="126" y="138" font-size="12" fill="#94a3b8">8</text>
      <text x="256" y="26" font-size="12" fill="#94a3b8">11</text>
      <text x="208" y="102" font-size="12" fill="#94a3b8">7</text>
      <text x="356" y="58" font-size="12" fill="#1d4ed8" font-weight="bold">2</text>
      <text x="272" y="162" font-size="12" fill="#94a3b8">9</text>
      <text x="364" y="138" font-size="12" fill="#94a3b8">6</text>
      <!-- nodes -->
      <circle cx="70" cy="95" r="22" fill="#1e3c72"/><text x="70" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">0</text>
      <circle cx="200" cy="38" r="22" fill="#2563eb"/><text x="200" y="43" text-anchor="middle" fill="white" font-size="12" font-weight="bold">1</text>
      <circle cx="200" cy="152" r="22" fill="#4A9CC7"/><text x="200" y="157" text-anchor="middle" fill="white" font-size="12" font-weight="bold">2</text>
      <circle cx="330" cy="38" r="22" fill="#16a34a"/><text x="330" y="43" text-anchor="middle" fill="white" font-size="12" font-weight="bold">3</text>
      <circle cx="330" cy="152" r="22" fill="#4A9CC7"/><text x="330" y="157" text-anchor="middle" fill="white" font-size="12" font-weight="bold">4</text>
      <circle cx="390" cy="95" r="22" fill="#16a34a"/><text x="390" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">5</text>
      <!-- distance labels -->
      <text x="70" y="122" text-anchor="middle" fill="#1e3c72" font-size="11" font-weight="bold">d=0</text>
      <text x="200" y="16" text-anchor="middle" fill="#1d4ed8" font-size="11" font-weight="bold">d=4</text>
      <text x="200" y="178" text-anchor="middle" fill="#64748b" font-size="11">d=12</text>
      <text x="330" y="16" text-anchor="middle" fill="#15803d" font-size="11" font-weight="bold">d=6</text>
      <text x="330" y="178" text-anchor="middle" fill="#64748b" font-size="11">d=15</text>
      <text x="390" y="122" text-anchor="middle" fill="#15803d" font-size="11" font-weight="bold">d=8</text>
    </svg>
    <p style="font-size:12px;color:#64748b;margin-top:4px">Blue edges = shortest path tree. d = shortest distance from Node 0.</p>
  </div>

  <h3>Important Rule</h3>
  <p style="background:#fef9c3;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #ca8a04">Dijkstra does NOT work with negative edge weights. Use Bellman-Ford for that.</p>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(V²) with adjacency matrix — V = number of vertices</div>
    <div><strong>Space:</strong> O(V) — for distance and visited arrays</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Google Maps &amp; GPS navigation</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Internet routing (OSPF protocol)</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Airline shortest-route planning</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Dijkstra Algorithm')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 4. KRUSKAL ---- */
"Kruskal Algorithm": `
<div class="theory-page">
  <h2>Kruskal's Algorithm</h2>
  <span class="algo-tag">Greedy — Minimum Spanning Tree</span>

  <h3>What is it? </h3>
  <p>Connect all cities (nodes) using roads (edges) with the <strong>minimum total cost</strong> and no loops. The result is called a Minimum Spanning Tree (MST). Kruskal greedily picks the cheapest available edge that does not form a cycle.</p>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Sort all edges by weight (cheapest first).</div>
    <div>2. Pick the cheapest edge.</div>
    <div>3. If adding it does NOT form a cycle → add it to MST.</div>
    <div>4. If it forms a cycle → skip it.</div>
    <div>5. Repeat until MST has (V-1) edges. Done.</div>
    <div style="margin-top:6px;color:#64748b"><em>Cycle detection uses Union-Find (parent array) — find(u) != find(v) means no cycle.</em></div>
  </div>

  <h3>MST Diagram (4 cities, 5 roads)</h3>
  <div style="text-align:center;margin:14px 0">
    <svg viewBox="0 0 420 185" style="width:100%;max-width:420px;font-family:Segoe UI,sans-serif">
      <!-- skipped edge (grey dashed) -->
      <line x1="200" y1="38" x2="200" y2="148" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5,3"/>
      <!-- MST edges (blue solid) -->
      <line x1="70" y1="93" x2="200" y2="38" stroke="#2563eb" stroke-width="3"/>
      <line x1="70" y1="93" x2="200" y2="148" stroke="#2563eb" stroke-width="3"/>
      <line x1="200" y1="38" x2="340" y2="93" stroke="#2563eb" stroke-width="3"/>
      <line x1="200" y1="148" x2="340" y2="93" stroke="#2563eb" stroke-width="3"/>
      <!-- weights -->
      <text x="126" y="52" font-size="12" fill="#1d4ed8" font-weight="bold">4</text>
      <text x="126" y="132" font-size="12" fill="#1d4ed8" font-weight="bold">3</text>
      <text x="270" y="52" font-size="12" fill="#1d4ed8" font-weight="bold">5</text>
      <text x="270" y="138" font-size="12" fill="#1d4ed8" font-weight="bold">6</text>
      <text x="208" y="100" font-size="12" fill="#94a3b8">8</text>
      <!-- nodes -->
      <circle cx="70" cy="93" r="22" fill="#1e3c72"/><text x="70" y="98" text-anchor="middle" fill="white" font-size="13" font-weight="bold">A</text>
      <circle cx="200" cy="38" r="22" fill="#1e3c72"/><text x="200" y="43" text-anchor="middle" fill="white" font-size="13" font-weight="bold">B</text>
      <circle cx="200" cy="148" r="22" fill="#1e3c72"/><text x="200" y="153" text-anchor="middle" fill="white" font-size="13" font-weight="bold">C</text>
      <circle cx="340" cy="93" r="22" fill="#1e3c72"/><text x="340" y="98" text-anchor="middle" fill="white" font-size="13" font-weight="bold">D</text>
      <!-- legend -->
      <line x1="20" y1="174" x2="46" y2="174" stroke="#2563eb" stroke-width="3"/>
      <text x="52" y="178" font-size="11" fill="#1e3c72">MST edges (total cost = 18)</text>
      <line x1="230" y1="174" x2="256" y2="174" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="262" y="178" font-size="11" fill="#94a3b8">Skipped (creates loop)</text>
    </svg>
  </div>
  <div style="background:#f8fafc;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:10px">
    <strong>Sorted edges:</strong> A-C(3) → A-B(4) → B-D(5) → C-D(6) → B-C(8, skip — loop)<br>
    <strong>MST cost:</strong> 3 + 4 + 5 + 6 = <strong>18</strong>
  </div>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(E log E) — E = number of edges (dominated by sorting)</div>
    <div><strong>Space:</strong> O(V) — for the parent array in Union-Find</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Laying internet/telephone cables</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Power grid design</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Water pipeline planning</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Kruskal Algorithm')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 5. GRAPH COLORING ---- */
"Graph Coloring": `
<div class="theory-page">
  <h2>Graph Coloring</h2>
  <span class="algo-tag">Backtracking</span>

  <h3>What is it? </h3>
  <p>Assign a <strong>color</strong> to each node in a graph so that <strong>no two connected nodes share the same color</strong>. Goal: use as few colors as possible. Think of it like scheduling exams — two subjects with shared students cannot happen at the same time slot (same color).</p>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Start with node 0. Try Color 1.</div>
    <div>2. Check if Color 1 is safe — no neighbor already has Color 1.</div>
    <div>3. If safe → assign it. Move to the next node.</div>
    <div>4. If not safe → try Color 2, Color 3, ... until one works.</div>
    <div>5. If no color works → backtrack to previous node and try the next color there.</div>
    <div>6. Continue until all nodes are colored.</div>
  </div>

  <h3>Coloring Diagram (3 colors, 4 nodes)</h3>
  <div style="text-align:center;margin:14px 0">
    <svg viewBox="0 0 360 190" style="width:100%;max-width:360px;font-family:Segoe UI,sans-serif">
      <line x1="82" y1="95" x2="180" y2="38" stroke="#94a3b8" stroke-width="2"/>
      <line x1="82" y1="95" x2="180" y2="152" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="38" x2="278" y2="95" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="152" x2="278" y2="95" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="38" x2="180" y2="152" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="82" cy="95" r="26" fill="#2563eb"/>
      <circle cx="180" cy="38" r="26" fill="#dc2626"/>
      <circle cx="180" cy="152" r="26" fill="#16a34a"/>
      <circle cx="278" cy="95" r="26" fill="#2563eb"/>
      <text x="82" y="90" text-anchor="middle" fill="white" font-size="11" font-weight="bold">A</text>
      <text x="82" y="104" text-anchor="middle" fill="white" font-size="10">Blue</text>
      <text x="180" y="33" text-anchor="middle" fill="white" font-size="11" font-weight="bold">B</text>
      <text x="180" y="47" text-anchor="middle" fill="white" font-size="10">Red</text>
      <text x="180" y="147" text-anchor="middle" fill="white" font-size="11" font-weight="bold">C</text>
      <text x="180" y="161" text-anchor="middle" fill="white" font-size="10">Green</text>
      <text x="278" y="90" text-anchor="middle" fill="white" font-size="11" font-weight="bold">D</text>
      <text x="278" y="104" text-anchor="middle" fill="white" font-size="10">Blue</text>
    </svg>
    <p style="font-size:12px;color:#64748b;margin-top:4px">No two connected nodes share a color. Only 3 colors needed.</p>
  </div>

  <h3>Key Term</h3>
  <p><strong>Chromatic Number</strong> — the minimum colors needed to color a graph.<br>Example: A triangle needs 3 colors. A simple path needs only 2.</p>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(m^V) worst case — m = colors, V = vertices</div>
    <div><strong>Space:</strong> O(V) — for the color array</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">University exam timetabling</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Compiler register allocation</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Mobile frequency assignment</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Graph Coloring')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 6. N-QUEENS ---- */
"N-Queens": `
<div class="theory-page">
  <h2>N-Queens Problem</h2>
  <span class="algo-tag">Backtracking</span>

  <h3>What is it? </h3>
  <p>Place <strong>N queens</strong> on an N×N chessboard so that <strong>no two queens attack each other</strong>. A queen attacks every cell in the same row, column, and both diagonals. So each queen needs its own unique row, column, and diagonals.</p>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Place queen in the first column, try each row one by one.</div>
    <div>2. Check if the position is safe (no conflict on row, upper-left diagonal, lower-left diagonal).</div>
    <div>3. If safe → place queen and move to the next column.</div>
    <div>4. If not safe → try the next row.</div>
    <div>5. If no row works → backtrack to the previous column, move its queen down.</div>
    <div>6. Repeat until all N columns have a queen placed.</div>
  </div>

  <h3>Board Diagram — Valid solution for N = 4</h3>
  <div style="text-align:center;margin:14px 0">
    <svg viewBox="0 0 192 192" style="width:172px;height:172px;font-family:Segoe UI,sans-serif">
      <rect x="4" y="4"   width="44" height="44" fill="#f8fafc" rx="2"/>
      <rect x="50" y="4"  width="44" height="44" fill="#2563eb" rx="2"/>
      <rect x="96" y="4"  width="44" height="44" fill="#f8fafc" rx="2"/>
      <rect x="142" y="4" width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="4" y="50"   width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="50" y="50"  width="44" height="44" fill="#f8fafc" rx="2"/>
      <rect x="96" y="50"  width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="142" y="50" width="44" height="44" fill="#2563eb" rx="2"/>
      <rect x="4" y="96"   width="44" height="44" fill="#2563eb" rx="2"/>
      <rect x="50" y="96"  width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="96" y="96"  width="44" height="44" fill="#f8fafc" rx="2"/>
      <rect x="142" y="96" width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="4" y="142"   width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="50" y="142"  width="44" height="44" fill="#e2e8f0" rx="2"/>
      <rect x="96" y="142"  width="44" height="44" fill="#2563eb" rx="2"/>
      <rect x="142" y="142" width="44" height="44" fill="#f8fafc" rx="2"/>
      <text x="72" y="33"  text-anchor="middle" fill="white" font-size="22" font-weight="bold">Q</text>
      <text x="164" y="79" text-anchor="middle" fill="white" font-size="22" font-weight="bold">Q</text>
      <text x="26" y="125" text-anchor="middle" fill="white" font-size="22" font-weight="bold">Q</text>
      <text x="118" y="171" text-anchor="middle" fill="white" font-size="22" font-weight="bold">Q</text>
    </svg>
    <p style="font-size:12px;color:#64748b;margin-top:6px">N=4 solution: Queens at columns 0,1,2,3 placed in rows 1,3,0,2</p>
  </div>

  <h3>Number of Solutions</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#dbeafe;border-radius:7px;padding:8px 16px;text-align:center"><div style="font-weight:700;font-size:16px;color:#1d4ed8">N=4</div><div style="font-size:12px">2 solutions</div></div>
    <div style="background:#dbeafe;border-radius:7px;padding:8px 16px;text-align:center"><div style="font-weight:700;font-size:16px;color:#1d4ed8">N=8</div><div style="font-size:12px">92 solutions</div></div>
    <div style="background:#dbeafe;border-radius:7px;padding:8px 16px;text-align:center"><div style="font-weight:700;font-size:16px;color:#1d4ed8">N=10</div><div style="font-size:12px">724 solutions</div></div>
  </div>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(N!) worst case — backtracking cuts many branches early</div>
    <div><strong>Space:</strong> O(N) — for the board array (one queen per column)</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">VLSI chip layout without conflicts</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Parallel memory access scheduling</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">AI constraint-satisfaction problems</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('N-Queens')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 7. GREEDY ---- */
"Greedy Method": `
<div class="theory-page">
  <h2>Greedy Method</h2>
  <span class="algo-tag">Greedy</span>

  <h3>What is it? </h3>
  <p>A greedy algorithm always picks the <strong>best available option right now</strong>, without worrying about the future. It makes one decision at a time and never goes back. It works when a locally best choice also leads to a globally best result.</p>

  <h3>Example — Coin Change</h3>
  <p>Make change for <strong>Rs 41</strong> using coins: 1, 5, 10, 25. Rule: always pick the largest coin that fits.</p>
  <div style="margin:10px 0">
    <div style="display:flex;align-items:center;gap:10px;margin:7px 0;flex-wrap:wrap">
      <div style="background:#fef9c3;border:2px solid #ca8a04;border-radius:7px;padding:7px 14px;font-weight:700;color:#92400e;min-width:56px;text-align:center">Rs 25</div>
      <span style="font-size:13px;color:#64748b">41 - 25 = 16 remaining</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin:7px 0;flex-wrap:wrap">
      <div style="background:#fef9c3;border:2px solid #ca8a04;border-radius:7px;padding:7px 14px;font-weight:700;color:#92400e;min-width:56px;text-align:center">Rs 10</div>
      <span style="font-size:13px;color:#64748b">16 - 10 = 6 remaining</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin:7px 0;flex-wrap:wrap">
      <div style="background:#fef9c3;border:2px solid #ca8a04;border-radius:7px;padding:7px 14px;font-weight:700;color:#92400e;min-width:56px;text-align:center">Rs 5</div>
      <span style="font-size:13px;color:#64748b">6 - 5 = 1 remaining</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin:7px 0;flex-wrap:wrap">
      <div style="background:#fef9c3;border:2px solid #ca8a04;border-radius:7px;padding:7px 14px;font-weight:700;color:#92400e;min-width:56px;text-align:center">Rs 1</div>
      <span style="font-size:13px;color:#64748b">1 - 1 = 0. Done!</span>
    </div>
    <div style="background:#dcfce7;border-radius:7px;padding:8px 14px;font-size:13px;color:#15803d;font-weight:700;display:inline-block;margin-top:6px">Result: 4 coins — 25 + 10 + 5 + 1</div>
  </div>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Sort coin denominations in descending order.</div>
    <div>2. Pick the largest coin ≤ remaining amount.</div>
    <div>3. Subtract it. Add it to your result list.</div>
    <div>4. Repeat until remaining = 0.</div>
  </div>

  <h3>When Greedy Fails</h3>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#dcfce7;border-radius:8px;padding:12px 14px;flex:1;min-width:140px;border:1px solid #16a34a">
      <div style="font-weight:700;color:#15803d;margin-bottom:4px">Greedy Works</div>
      <div style="font-size:13px">Standard coins: 1, 5, 10, 25<br>Kruskal MST, Activity Selection</div>
    </div>
    <div style="background:#fee2e2;border-radius:8px;padding:12px 14px;flex:1;min-width:140px;border:1px solid #dc2626">
      <div style="font-weight:700;color:#dc2626;margin-bottom:4px">Greedy Fails</div>
      <div style="font-size:13px">Coins {1,3,4}, amount=6:<br>Greedy: 4+1+1=3 coins<br>Optimal: 3+3=2 coins → use DP</div>
    </div>
  </div>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(n log n) to sort + O(amount) for selection</div>
    <div><strong>Space:</strong> O(1) — no extra table needed</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">ATM cash dispensing</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Vending machine change</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Huffman coding (data compression)</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Greedy Method')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`,

/* ---- 8. HASHING ---- */
"Hashing": `
<div class="theory-page">
  <h2>Hashing</h2>
  <span class="algo-tag">Hashing</span>

  <h3>What is it? </h3>
  <p>Hashing stores data in a table so you can <strong>find it instantly</strong>. A <strong>hash function</strong> converts a key into an index. You store the value at that index. When you search, compute the same index — you land directly on the data in O(1) time.</p>

  <h3>Hash Function</h3>
  <div style="background:#f0f7ff;border-radius:8px;padding:12px 16px;font-size:13px;margin:10px 0;border-left:4px solid #2563eb">
    <strong>Formula:</strong> index = key % table_size<br><br>
    Table size = 10<br>
    key 50 → 50 % 10 = index <strong>0</strong><br>
    key 23 → 23 % 10 = index <strong>3</strong><br>
    key 47 → 47 % 10 = index <strong>7</strong>
  </div>

  <h3>Hash Table Diagram (size = 10)</h3>
  <div style="margin:12px 0;overflow-x:auto">
    <svg viewBox="0 0 470 78" style="width:100%;max-width:470px;font-family:Segoe UI,sans-serif">
      <rect x="4"   y="8" width="42" height="40" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
      <rect x="49"  y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="94"  y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="139" y="8" width="42" height="40" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
      <rect x="184" y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="229" y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="274" y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="319" y="8" width="42" height="40" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
      <rect x="364" y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <rect x="409" y="8" width="42" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="5"/>
      <text x="25"  y="33" text-anchor="middle" font-size="13" fill="#1d4ed8" font-weight="bold">50</text>
      <text x="70"  y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="115" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="160" y="33" text-anchor="middle" font-size="13" fill="#1d4ed8" font-weight="bold">23</text>
      <text x="205" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="250" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="295" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="340" y="33" text-anchor="middle" font-size="13" fill="#1d4ed8" font-weight="bold">47</text>
      <text x="385" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="430" y="33" text-anchor="middle" font-size="13" fill="#94a3b8">-</text>
      <text x="25"  y="64" text-anchor="middle" font-size="11" fill="#64748b">0</text>
      <text x="70"  y="64" text-anchor="middle" font-size="11" fill="#64748b">1</text>
      <text x="115" y="64" text-anchor="middle" font-size="11" fill="#64748b">2</text>
      <text x="160" y="64" text-anchor="middle" font-size="11" fill="#64748b">3</text>
      <text x="205" y="64" text-anchor="middle" font-size="11" fill="#64748b">4</text>
      <text x="250" y="64" text-anchor="middle" font-size="11" fill="#64748b">5</text>
      <text x="295" y="64" text-anchor="middle" font-size="11" fill="#64748b">6</text>
      <text x="340" y="64" text-anchor="middle" font-size="11" fill="#64748b">7</text>
      <text x="385" y="64" text-anchor="middle" font-size="11" fill="#64748b">8</text>
      <text x="430" y="64" text-anchor="middle" font-size="11" fill="#64748b">9</text>
    </svg>
    <p style="font-size:12px;color:#64748b;margin-top:2px">Blue = filled slots. Index shown below each slot.</p>
  </div>

  <h3>Collision &amp; Linear Probing</h3>
  <p>A <strong>collision</strong> happens when two keys map to the same index. <strong>Linear probing</strong> solves it: if slot is taken, try next slot, then next, until empty.</p>
  <div style="background:#fef9c3;border-radius:8px;padding:10px 14px;font-size:13px;border-left:3px solid #ca8a04;margin:10px 0">
    key 23 → index 3 (empty) → store here<br>
    key 13 → index 3 (taken!) → try index 4 (empty) → store there
  </div>

  <h3>Algorithm (Step by Step)</h3>
  <div style="background:#f8fafc;border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9">
    <div>1. Compute index = key % size.</div>
    <div>2. If slot is empty → store the key there.</div>
    <div>3. If slot is occupied (collision) → move to (index+1) % size.</div>
    <div>4. Repeat until an empty slot is found.</div>
    <div>5. For search: compute index, probe until key is found or empty slot hit.</div>
  </div>

  <h3>Time &amp; Space Complexity</h3>
  <div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:6px;padding:10px 16px;font-size:13px">
    <div><strong>Time:</strong> O(1) average for insert/search — O(n) worst case (all collide)</div>
    <div><strong>Space:</strong> O(n) — for the hash table array</div>
  </div>

  <h3>Real-Life Uses</h3>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Python dicts &amp; Java HashMaps</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Database indexing</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Password verification</div>
    <div style="background:#f0f7ff;border-radius:7px;padding:10px 14px;font-size:13px;border-left:3px solid #2563eb">Caching systems</div>
  </div>
  <div style="margin-top:24px">
    <button class="btn" onclick="openSolver('Hashing')">Solve Problems</button>
    <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
  </div>
</div>`

    }; // end pages

    const content = pages[topic];
    if (content) {
        document.getElementById("mainContent").innerHTML = content;
    } else {
        document.getElementById("mainContent").innerHTML = `
            <div class="theory-page">
                <h2>${topic}</h2>
                <p>Theory not available for this topic.</p>
                <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
            </div>`;
    }
}


/* =============================================================
   SOLVE  —  all algorithms run fully client-side
   ============================================================= */
function openSolver(topic) {
    // normalize names from smart solver partial matches
    if (topic.includes("Dijkstra")) topic = "Dijkstra Algorithm";
    else if (topic.includes("Knapsack")) topic = "Knapsack (DP)";
    else if (topic.includes("Kruskal")) topic = "Kruskal Algorithm";
    else if (topic.includes("Greedy") || topic.includes("Coin")) topic = "Greedy Method";
    else if (topic.includes("LCS") || topic.includes("Common")) topic = "Longest Common Subsequence";
    else if (topic.includes("Hash")) topic = "Hashing";
    else if (topic.includes("Color")) topic = "Graph Coloring";
    else if (topic.includes("Queen")) topic = "N-Queens";

    let inputHTML = "";

    if (topic === "N-Queens") {
        inputHTML = `
            <label>Enter value of N (number of queens):</label>
            <input id="n" type="number" placeholder="e.g. 4">`;
    } else if (topic === "Dijkstra Algorithm") {
        inputHTML = `
            <label>Enter number of nodes:</label>
            <input id="nodes" type="number" placeholder="e.g. 4" onchange="generateMatrix()">
            <div id="matrixInputs"></div>`;
    } else if (topic === "Knapsack (DP)") {
        inputHTML = `
            <label>Enter capacity (W):</label>
            <input id="capacity" type="number" placeholder="e.g. 7">
            <label>Enter number of items:</label>
            <input id="items" type="number" placeholder="e.g. 4">
            <label>Enter weights and values (weight value per line):</label>
            <textarea id="data" placeholder="1 1&#10;3 4&#10;4 5&#10;5 7"></textarea>`;
    } else if (topic === "Longest Common Subsequence") {
        inputHTML = `
            <label>Enter first string:</label>
            <input type="text" id="str1" placeholder="e.g. ABCBDAB">
            <label>Enter second string:</label>
            <input type="text" id="str2" placeholder="e.g. BDCAB">`;
    } else if (topic === "Kruskal Algorithm") {
        inputHTML = `
            <label>Enter number of nodes:</label>
            <input id="nodes" type="number" placeholder="e.g. 4">
            <label>Enter number of edges:</label>
            <input id="edges" type="number" placeholder="e.g. 5">
            <label>Enter edges (u v w per line):</label>
            <textarea id="edata" placeholder="0 1 2&#10;1 2 3&#10;0 2 1"></textarea>`;
    } else if (topic === "Graph Coloring") {
        inputHTML = `
            <label>Enter number of nodes:</label>
            <input id="nodes" type="number" placeholder="e.g. 4">
            <label>Enter adjacency matrix (space separated, one row per line):</label>
            <textarea id="matrix" placeholder="0 1 1 0&#10;1 0 1 1&#10;1 1 0 1&#10;0 1 1 0"></textarea>`;
    } else if (topic === "Greedy Method") {
        inputHTML = `
            <label>Enter amount:</label>
            <input id="amount" type="number" placeholder="e.g. 41">
            <label>Enter coin denominations (space separated):</label>
            <input type="text" id="coins" placeholder="1 5 10 25">`;
    } else if (topic === "Hashing") {
        inputHTML = `
            <label>Enter integer keys (space separated):</label>
            <input type="text" id="keys" placeholder="10 21 32 43 54">`;
    }

    document.getElementById("mainContent").innerHTML = `
        <div class="solver-page">
            <h2>${topic}</h2>
            ${inputHTML}
            <div style="margin-top:10px">
                <button class="btn" onclick="runAlgo('${topic}')">Solve</button>
                <button class="btn btn-secondary" onclick="openConcept('${topic}')">Learn Concept</button>
                <button class="btn btn-secondary" onclick="loadDashboard()">Back</button>
            </div>
            <div id="output"></div>
        </div>`;
}

function generateMatrix() {
    const n = parseInt(document.getElementById("nodes").value);
    if (!n || n < 1 || n > 15) return;
    let html = "<label style='margin-top:10px;display:block'>Adjacency matrix (0 = no edge):</label>";
    html += "<table style='border-collapse:separate;border-spacing:4px;margin-top:8px'><tr><td></td>";
    for (let j = 0; j < n; j++) html += `<td style="text-align:center;font-size:12px;color:#64748b">${j}</td>`;
    html += "</tr>";
    for (let i = 0; i < n; i++) {
        html += `<tr><td style="font-size:12px;color:#64748b;padding-right:4px">${i}</td>`;
        for (let j = 0; j < n; j++) {
            html += `<td><input type="number" id="cell_${i}_${j}" value="0" style="width:50px;padding:5px;margin:0;text-align:center;border:1.5px solid #cbd5e1;border-radius:4px"></td>`;
        }
        html += "</tr>";
    }
    html += "</table><br>";
    document.getElementById("matrixInputs").innerHTML = html;
}

/* --- All algorithms — client-side implementations --- */

function solveNQueens(n) {
    const board = Array.from({ length: n }, () => new Array(n).fill(0));

    function safe(b, r, c) {
        for (let i = 0; i < c; i++) if (b[r][i] === 1) return false;
        for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) if (b[i][j] === 1) return false;
        for (let i = r, j = c; i < n && j >= 0; i++, j--) if (b[i][j] === 1) return false;
        return true;
    }

    function solve(col) {
        if (col === n) return true;
        for (let row = 0; row < n; row++) {
            if (safe(board, row, col)) {
                board[row][col] = 1;
                if (solve(col + 1)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    if (!solve(0)) return "<strong>No solution exists for N = " + n + "</strong>";

    let res = "<strong>N-Queens Solution (N = " + n + "):</strong><br><br>";
    res += "<table style='border-collapse:collapse;font-family:monospace'>";
    for (let i = 0; i < n; i++) {
        res += "<tr>";
        for (let j = 0; j < n; j++) {
            const isQ = board[i][j] === 1;
            res += `<td style="width:36px;height:36px;text-align:center;font-size:20px;border:1px solid #cbd5e1;background:${(i+j)%2===0?'#f8fafc':'#e2e8f0'}">${isQ ? "Q" : ""}</td>`;
        }
        res += "</tr>";
    }
    res += "</table>";
    res += "<br><strong>Algorithm:</strong> Backtracking &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(N!)";
    return res;
}

function solveDijkstra(n, graph) {
    const dist = new Array(n).fill(Infinity);
    const vis = new Array(n).fill(false);
    dist[0] = 0;

    for (let i = 0; i < n - 1; i++) {
        let u = -1, mn = Infinity;
        for (let j = 0; j < n; j++) {
            if (!vis[j] && dist[j] < mn) { mn = dist[j]; u = j; }
        }
        if (u === -1) break;
        vis[u] = true;
        for (let v = 0; v < n; v++) {
            if (!vis[v] && graph[u][v] !== 0 && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    let res = "<strong>Dijkstra Shortest Paths from Node 0:</strong><br><br>";
    res += "<table><tr><th>Node</th><th>Shortest Distance from 0</th></tr>";
    for (let i = 0; i < n; i++) {
        res += `<tr><td>${i}</td><td>${dist[i] === Infinity ? "Unreachable" : dist[i]}</td></tr>`;
    }
    res += "</table>";
    res += "<br><strong>Algorithm:</strong> Greedy (Dijkstra) &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(V²)";
    return res;
}

function solveKnapsack(W, items) {
    const n = items.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (items[i-1].wt <= w)
                dp[i][w] = Math.max(items[i-1].val + dp[i-1][w - items[i-1].wt], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }

    // traceback
    const chosen = [];
    let w = W;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i-1][w]) { chosen.push(i-1); w -= items[i-1].wt; }
    }

    let res = "<strong>Knapsack Result:</strong><br><br>";
    res += `Maximum Profit: <strong>${dp[n][W]}</strong><br><br>`;
    res += "<table><tr><th>Item</th><th>Weight</th><th>Value</th></tr>";
    chosen.reverse().forEach(idx => {
        res += `<tr><td>${idx + 1}</td><td>${items[idx].wt}</td><td>${items[idx].val}</td></tr>`;
    });
    res += "</table>";
    res += "<br><strong>Algorithm:</strong> Dynamic Programming &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(n * W)";
    return res;
}

function solveLCS(s1, s2) {
    const n = s1.length, m = s2.length;
    const dp = Array.from({ length: n+1 }, () => new Array(m+1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }

    let lcs = "";
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (s1[i-1] === s2[j-1]) { lcs = s1[i-1] + lcs; i--; j--; }
        else if (dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
    }

    return `<strong>LCS Result:</strong><br><br>
        String 1: ${s1}<br>String 2: ${s2}<br><br>
        <strong>LCS:</strong> ${lcs || "(none)"}<br>
        <strong>Length:</strong> ${dp[n][m]}<br><br>
        <strong>Algorithm:</strong> Dynamic Programming &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(n * m)`;
}

function solveKruskal(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);
    const parent = Array.from({ length: n }, (_, i) => i);
    function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }

    let cost = 0;
    const mst = [];
    for (const [u, v, w] of edges) {
        const pu = find(u), pv = find(v);
        if (pu !== pv) { cost += w; mst.push([u,v,w]); parent[pu] = pv; }
    }

    let res = "<strong>Kruskal MST:</strong><br><br>";
    res += "<table><tr><th>Edge (u - v)</th><th>Weight</th></tr>";
    mst.forEach(([u,v,w]) => { res += `<tr><td>${u} - ${v}</td><td>${w}</td></tr>`; });
    res += `</table><br><strong>Total MST Cost:</strong> ${cost}`;
    res += "<br><br><strong>Algorithm:</strong> Greedy (Kruskal) &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(E log E)";
    return res;
}

function solveGraphColor(n, graph) {
    const color = new Array(n).fill(0);

    function isSafe(v, c) {
        for (let i = 0; i < n; i++) if (graph[v][i] === 1 && color[i] === c) return false;
        return true;
    }

    function colorUtil(v) {
        if (v === n) return true;
        for (let c = 1; c <= 3; c++) {
            if (isSafe(v, c)) {
                color[v] = c;
                if (colorUtil(v + 1)) return true;
                color[v] = 0;
            }
        }
        return false;
    }

    if (!colorUtil(0)) return "<strong>No solution found with 3 colors.</strong><br>This graph requires more than 3 colors.";

    const colorNames = ["", "Red", "Green", "Blue"];
    let res = "<strong>Graph Coloring Result (max 3 colors):</strong><br><br>";
    res += "<table><tr><th>Node</th><th>Color</th></tr>";
    for (let i = 0; i < n; i++) {
        res += `<tr><td>Node ${i}</td><td>${colorNames[color[i]]}</td></tr>`;
    }
    res += "</table>";
    res += "<br><strong>Algorithm:</strong> Backtracking &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(3^N)";
    return res;
}

function solveGreedy(amount, coins) {
    const sorted = [...coins].sort((a, b) => b - a);
    const used = [];
    let remaining = amount;

    for (const coin of sorted) {
        while (remaining >= coin) { used.push(coin); remaining -= coin; }
    }

    let res = `<strong>Greedy Coin Change:</strong><br><br>Amount: ${amount}<br>`;
    res += `Coins used: ${used.join(", ")}<br>`;
    res += `Total coins: <strong>${used.length}</strong>`;
    if (remaining > 0) res += `<br><br><strong>Note:</strong> Could not make exact change. Remainder: ${remaining}. This usually means the coin set is non-standard and DP would be needed.`;
    res += "<br><br><strong>Algorithm:</strong> Greedy &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(n log n)";
    return res;
}

function solveHashing(keys) {
    const size = 10;
    const table = new Array(size).fill(null);

    const steps = [];
    for (const key of keys) {
        let idx = key % size;
        let original = idx;
        let probes = 0;
        while (table[idx] !== null && probes < size) {
            idx = (idx + 1) % size;
            probes++;
        }
        if (probes < size) {
            table[idx] = key;
            steps.push(`key ${key}: h(${key}) = ${original}${probes > 0 ? ` → collision → placed at index ${idx} after ${probes} probe(s)` : ` → placed at index ${idx}`}`);
        } else {
            steps.push(`key ${key}: table full, could not insert`);
        }
    }

    let res = "<strong>Hash Table (size 10, Linear Probing):</strong><br><br>";
    res += "<table><tr><th>Index</th><th>Value</th></tr>";
    for (let i = 0; i < size; i++) {
        res += `<tr><td>${i}</td><td>${table[i] === null ? "-" : table[i]}</td></tr>`;
    }
    res += "</table><br><strong>Insertion Steps:</strong><br>";
    steps.forEach(s => { res += s + "<br>"; });
    res += "<br><strong>Algorithm:</strong> Hashing with Linear Probing &nbsp;|&nbsp; <strong>Time Complexity:</strong> O(1) average";
    return res;
}

/* --- Main dispatcher --- */
function runAlgo(topic) {
    const outputDiv = document.getElementById("output");
    outputDiv.className = "visible";
    let result = "";

    try {
        if (topic === "N-Queens") {
            const n = parseInt(document.getElementById("n").value);
            if (!n || n < 1 || n > 12) { showOutput("Please enter a valid N between 1 and 12."); return; }
            result = solveNQueens(n);
        }
        else if (topic === "Dijkstra Algorithm") {
            const n = parseInt(document.getElementById("nodes").value);
            if (!n || n < 2) { showOutput("Please enter the number of nodes (at least 2) and fill the matrix."); return; }
            const graph = [];
            for (let i = 0; i < n; i++) {
                graph[i] = [];
                for (let j = 0; j < n; j++) {
                    const el = document.getElementById(`cell_${i}_${j}`);
                    graph[i][j] = el ? (parseInt(el.value) || 0) : 0;
                }
            }
            result = solveDijkstra(n, graph);
        }
        else if (topic === "Knapsack (DP)") {
            const W = parseInt(document.getElementById("capacity").value);
            const nItems = parseInt(document.getElementById("items").value);
            const raw = document.getElementById("data").value.trim().split("\n");
            if (!W || !nItems || raw.length < nItems) { showOutput("Please fill capacity, number of items, and item data (weight value per line)."); return; }
            const items = raw.slice(0, nItems).map(line => {
                const p = line.trim().split(/\s+/);
                return { wt: parseInt(p[0]), val: parseInt(p[1]) };
            });
            if (items.some(it => isNaN(it.wt) || isNaN(it.val))) { showOutput("Each item line must have two numbers: weight value"); return; }
            result = solveKnapsack(W, items);
        }
        else if (topic === "Longest Common Subsequence") {
            const s1 = document.getElementById("str1").value.trim();
            const s2 = document.getElementById("str2").value.trim();
            if (!s1 || !s2) { showOutput("Please enter both strings."); return; }
            result = solveLCS(s1, s2);
        }
        else if (topic === "Kruskal Algorithm") {
            const n = parseInt(document.getElementById("nodes").value);
            const e = parseInt(document.getElementById("edges").value);
            const raw = document.getElementById("edata").value.trim().split("\n");
            if (!n || !e || raw.length < e) { showOutput("Please fill nodes, edges, and edge list correctly."); return; }
            const edges = raw.slice(0, e).map(line => line.trim().split(/\s+/).map(Number));
            if (edges.some(ed => ed.length < 3 || ed.some(isNaN))) { showOutput("Each edge line must have: u v weight"); return; }
            result = solveKruskal(n, edges);
        }
        else if (topic === "Graph Coloring") {
            const n = parseInt(document.getElementById("nodes").value);
            const raw = document.getElementById("matrix").value.trim().split("\n");
            if (!n || raw.length < n) { showOutput("Please enter number of nodes and complete adjacency matrix."); return; }
            const graph = raw.slice(0, n).map(line => line.trim().split(/\s+/).map(Number));
            if (graph.some(row => row.length !== n)) { showOutput("Adjacency matrix must be " + n + " x " + n + "."); return; }
            result = solveGraphColor(n, graph);
        }
        else if (topic === "Greedy Method") {
            const amount = parseInt(document.getElementById("amount").value);
            const coinsRaw = document.getElementById("coins").value.trim().split(/\s+/).map(Number);
            if (!amount || coinsRaw.some(isNaN) || coinsRaw.length === 0) { showOutput("Please enter a valid amount and coin denominations."); return; }
            result = solveGreedy(amount, coinsRaw);
        }
        else if (topic === "Hashing") {
            const keysRaw = document.getElementById("keys").value.trim().split(/\s+/).map(Number);
            if (keysRaw.some(isNaN)) { showOutput("Please enter valid integer keys."); return; }
            result = solveHashing(keysRaw);
        }
        else {
            result = "Algorithm not implemented.";
        }
    } catch (err) {
        result = "Error: " + err.message;
    }

    showOutput(result);
}

function showOutput(html) {
    const outputDiv = document.getElementById("output");
    outputDiv.className = "visible";
    outputDiv.innerHTML = html;
}

/* =============================================================
   QUIZ  —  per-topic questions with proper UI
   ============================================================= */
const quizDB = {
    "Knapsack (DP)": [
        { q: "What paradigm does the 0/1 Knapsack problem use?", a: "Dynamic Programming", o: ["Dynamic Programming", "Greedy", "Backtracking", "Divide and Conquer"] },
        { q: "What is the time complexity of 0/1 Knapsack DP?", a: "O(nW)", o: ["O(n^2)", "O(nW)", "O(n log n)", "O(2^n)"] },
        { q: "In 0/1 Knapsack, can an item be split into fractions?", a: "No", o: ["Yes", "No", "Only if value > weight", "Depends on capacity"] },
        { q: "Which property allows DP to solve Knapsack efficiently?", a: "Overlapping subproblems", o: ["Greedy choice", "Overlapping subproblems", "Divide and conquer", "Randomization"] },
        { q: "Knapsack is used in which real-world area?", a: "Resource allocation", o: ["Routing", "Resource allocation", "Graph coloring", "String matching"] }
    ],
    "Longest Common Subsequence": [
        { q: "What does LCS stand for?", a: "Longest Common Subsequence", o: ["Longest Common Substring", "Longest Common Subsequence", "Least Common Set", "Last Computed Sequence"] },
        { q: "What is the time complexity of LCS DP?", a: "O(n * m)", o: ["O(n + m)", "O(n * m)", "O(n^2)", "O(n log n)"] },
        { q: "LCS is commonly used in which application?", a: "DNA sequence analysis", o: ["GPS routing", "DNA sequence analysis", "Graph coloring", "Hash tables"] },
        { q: "If X[i] == Y[j] in LCS, what is dp[i][j]?", a: "1 + dp[i-1][j-1]", o: ["dp[i-1][j-1]", "1 + dp[i-1][j-1]", "max(dp[i-1][j], dp[i][j-1])", "0"] },
        { q: "A subsequence must preserve the original order?", a: "True", o: ["True", "False"] }
    ],
    "Dijkstra Algorithm": [
        { q: "What kind of graph does Dijkstra work correctly on?", a: "Non-negative weighted graph", o: ["Negative weighted graph", "Non-negative weighted graph", "Unweighted graph", "Complete graph"] },
        { q: "What approach does Dijkstra use?", a: "Greedy", o: ["Dynamic Programming", "Backtracking", "Greedy", "Divide and Conquer"] },
        { q: "Dijkstra finds shortest path from?", a: "Single source to all vertices", o: ["All pairs", "Single source to all vertices", "Single source to single destination only", "Nearest neighbor only"] },
        { q: "Time complexity of Dijkstra with adjacency matrix?", a: "O(V^2)", o: ["O(E log V)", "O(V^2)", "O(V + E)", "O(E^2)"] },
        { q: "Dijkstra is used in which system?", a: "GPS Navigation", o: ["DNA analysis", "GPS Navigation", "Exam scheduling", "Hash tables"] }
    ],
    "Kruskal Algorithm": [
        { q: "What does Kruskal's algorithm find?", a: "Minimum Spanning Tree", o: ["Shortest path", "Minimum Spanning Tree", "Maximum flow", "Topological sort"] },
        { q: "Kruskal sorts edges by?", a: "Weight (ascending)", o: ["Number of vertices", "Weight (ascending)", "Weight (descending)", "Edge label"] },
        { q: "Kruskal uses which data structure to detect cycles?", a: "Union-Find", o: ["Stack", "Queue", "Union-Find", "Heap"] },
        { q: "Time complexity of Kruskal's algorithm?", a: "O(E log E)", o: ["O(V^2)", "O(E log E)", "O(V log V)", "O(E * V)"] },
        { q: "Kruskal is applied in which area?", a: "Network cable design", o: ["DNA matching", "Network cable design", "GPS routing", "Text search"] }
    ],
    "Graph Coloring": [
        { q: "What does graph coloring ensure?", a: "No two adjacent vertices share the same color", o: ["All vertices same color", "No two adjacent vertices share the same color", "Minimum edges", "Maximum clique"] },
        { q: "Which algorithm solves graph coloring in this project?", a: "Backtracking", o: ["Greedy", "Dynamic Programming", "Backtracking", "Divide and Conquer"] },
        { q: "Graph coloring is used for?", a: "Exam timetabling", o: ["Shortest path", "Exam timetabling", "Knapsack packing", "String comparison"] },
        { q: "The minimum number of colors needed for a graph is called?", a: "Chromatic number", o: ["Color index", "Chromatic number", "Degree", "Clique number"] },
        { q: "A triangle graph needs at least how many colors?", a: "3", o: ["1", "2", "3", "4"] }
    ],
    "N-Queens": [
        { q: "N-Queens places N queens such that?", a: "No two queens attack each other", o: ["All queens in same row", "No two queens attack each other", "All queens on diagonal", "Queens fill the board"] },
        { q: "Which technique does N-Queens use?", a: "Backtracking", o: ["Greedy", "Dynamic Programming", "Backtracking", "Hashing"] },
        { q: "N-Queens worst case time complexity?", a: "O(N!)", o: ["O(N^2)", "O(N!)", "O(2^N)", "O(N log N)"] },
        { q: "How many solutions exist for N=4?", a: "2", o: ["1", "2", "4", "8"] },
        { q: "In N-Queens, queens are placed?", a: "One per column", o: ["Two per row", "One per column", "One per diagonal", "All in first row"] }
    ],
    "Greedy Method": [
        { q: "Greedy algorithm selects?", a: "Locally optimal choice at each step", o: ["Randomly", "Worst available option", "Locally optimal choice at each step", "All options and picks best"] },
        { q: "Greedy coin change always gives optimal result when?", a: "Denominations are standard (like 1,5,10,25)", o: ["Never", "Always", "Denominations are standard (like 1,5,10,25)", "Only for even amounts"] },
        { q: "Greedy is used in which of these?", a: "Kruskal's MST", o: ["LCS", "0/1 Knapsack", "Kruskal's MST", "N-Queens"] },
        { q: "Which property must a problem have for greedy to work?", a: "Greedy choice property", o: ["Overlapping subproblems", "Greedy choice property", "Random structure", "No optimal substructure"] },
        { q: "ATM cash dispensing uses which approach?", a: "Greedy", o: ["DP", "Backtracking", "Greedy", "Hashing"] }
    ],
    "Hashing": [
        { q: "Average time complexity of hash table lookup?", a: "O(1)", o: ["O(n)", "O(log n)", "O(1)", "O(n^2)"] },
        { q: "Linear probing resolves collisions by?", a: "Checking the next available slot sequentially", o: ["Chaining with linked list", "Checking the next available slot sequentially", "Rehashing with new function", "Throwing an error"] },
        { q: "A collision in hashing means?", a: "Two keys map to the same index", o: ["Table is full", "Two keys map to the same index", "Key is negative", "Hash function fails"] },
        { q: "Hash tables are used in?", a: "Database indexing", o: ["GPS routing", "DNA matching", "Database indexing", "N-Queens problem"] },
        { q: "Load factor in hashing is defined as?", a: "Elements / Table size", o: ["Table size / Elements", "Elements * Table size", "Elements / Table size", "Max elements - current"] }
    ]
};

function startQuiz(topic) {
    const questions = quizDB[topic] || [];
    let qIndex = 0;
    let score = 0;
    let answered = false;

    function render() {
        if (qIndex >= questions.length) {
            showFinalResult();
            return;
        }

        const q = questions[qIndex];
        const progress = ((qIndex) / questions.length) * 100;

        const optionsHTML = q.o.map(opt =>
            `<button class="quiz-option-btn" onclick="handleAnswer(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>`
        ).join("");

        document.getElementById("mainContent").innerHTML = `
            <div class="quiz-wrapper">
                <div class="quiz-card">
                    <div class="quiz-header">Question ${qIndex + 1} of ${questions.length}</div>
                    <div class="quiz-topic">${topic}</div>
                    <div class="quiz-progress">
                        <div class="quiz-progress-fill" style="width:${progress}%"></div>
                    </div>
                    <h3>${q.q}</h3>
                    <div class="quiz-options">${optionsHTML}</div>
                    <div id="quizFeedback"></div>
                </div>
            </div>`;

        window.handleAnswer = function(btn, selected) {
            if (answered) return;
            answered = true;

            const correct = questions[qIndex].a;
            const allBtns = document.querySelectorAll(".quiz-option-btn");

            allBtns.forEach(b => {
                b.disabled = true;
                if (b.textContent === correct) b.classList.add("correct");
            });

            if (selected === correct) {
                score++;
                btn.classList.add("correct");
                document.getElementById("quizFeedback").innerHTML = `<div class="quiz-result-msg correct-msg">Correct!</div>`;
            } else {
                btn.classList.add("wrong");
                document.getElementById("quizFeedback").innerHTML = `<div class="quiz-result-msg wrong-msg">Wrong. Correct answer: ${correct}</div>`;
            }

            setTimeout(() => {
                qIndex++;
                answered = false;
                render();
            }, 1200);
        };
    }

    function showFinalResult() {
        const pct = Math.round((score / questions.length) * 100);
        let msg = pct >= 80 ? "Excellent work!" : pct >= 60 ? "Good effort! Review the missed ones." : "Keep studying — practice makes perfect.";
        document.getElementById("mainContent").innerHTML = `
            <div class="quiz-wrapper">
                <div class="quiz-card">
                    <div class="quiz-header">Quiz Complete</div>
                    <div class="quiz-topic">${topic}</div>
                    <div class="score-display">${score} / ${questions.length}</div>
                    <div class="score-label">${pct}%  —  ${msg}</div>
                    <div style="margin-top:10px">
                        <button class="btn" onclick="startQuiz('${topic}')">Retry Quiz</button>
                        <button class="btn btn-secondary" onclick="openConcept('${topic}')">Review Theory</button>
                        <button class="btn btn-secondary" onclick="loadDashboard()">Dashboard</button>
                    </div>
                </div>
            </div>`;
    }

    render();
}