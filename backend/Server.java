import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;

public class Server {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/dijkstra", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, dijkstra(input));
        });

        server.createContext("/knapsack", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, knapsack(input));
        });

        server.createContext("/lcs", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, lcs(input));
        });

        server.createContext("/nqueen", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, nQueen(input));
        });

        server.createContext("/kruskal", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, kruskal(input));
        });

        server.createContext("/graphcolor", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, graphColor(input));
        });

        server.createContext("/greedy", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, greedy(input));
        });

        server.createContext("/hashing", e -> {
            String input = new String(e.getRequestBody().readAllBytes());
            send(e, hashing(input));
        });

        server.start();
        System.out.println("Server running at http://localhost:8080");
    }

    static void send(HttpExchange e, String res) throws IOException {
        e.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        e.sendResponseHeaders(200, res.length());
        OutputStream os = e.getResponseBody();
        os.write(res.getBytes());
        os.close();
    }

    // ===============================
    // KNAPSACK (DP)
    // ===============================
    static String knapsack(String input) {
        try {
            String[] lines = input.trim().split("\n");

            int W = Integer.parseInt(lines[0].trim());
            int n = Integer.parseInt(lines[1].trim());

            int[] wt = new int[n];
            int[] val = new int[n];

            for (int i = 0; i < n; i++) {
                String[] p = lines[i + 2].trim().split("\\s+");
                wt[i] = Integer.parseInt(p[0]);
                val[i] = Integer.parseInt(p[1]);
            }

            int[][] dp = new int[n + 1][W + 1];

            for (int i = 1; i <= n; i++) {
                for (int w = 0; w <= W; w++) {
                    if (wt[i - 1] <= w)
                        dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                    else
                        dp[i][w] = dp[i - 1][w];
                }
            }

            return "<h3>Knapsack Result</h3>Max Profit: " + dp[n][W] +
                    "<br><b>Algorithm:</b> Dynamic Programming" +
                    "<br><b>Time Complexity:</b> O(nW)";
        } catch (Exception e) {
            return "<h3>Error: Invalid Input</h3>";
        }
    }

    // ===============================
    // LCS (DP)
    // ===============================
    static String lcs(String input) {
        try {
            String[] p = input.trim().split("\n");
            String s1 = p[0].trim();
            String s2 = p[1].trim();

            int n = s1.length(), m = s2.length();
            int[][] dp = new int[n + 1][m + 1];

            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= m; j++) {
                    if (s1.charAt(i - 1) == s2.charAt(j - 1))
                        dp[i][j] = 1 + dp[i - 1][j - 1];
                    else
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }

            String lcs = "";
            int i = n, j = m;
            while (i > 0 && j > 0) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    lcs = s1.charAt(i - 1) + lcs;
                    i--; j--;
                } else if (dp[i - 1][j] > dp[i][j - 1]) i--;
                else j--;
            }

            return "<h3>LCS Result</h3>LCS = " + lcs +
                    "<br>Length = " + dp[n][m] +
                    "<br><b>Algorithm:</b> Dynamic Programming" +
                    "<br><b>Time Complexity:</b> O(n*m)";
        } catch (Exception e) {
            return "Error";
        }
    }

    // ===============================
    // N-QUEENS (BACKTRACKING)
    // ===============================
    static String nQueen(String input) {
        try {
            int n = Integer.parseInt(input.trim());
            int[][] board = new int[n][n];

            solve(board, 0, n);

            String res = "<h3>N-Queens</h3>";

            for (int[] row : board) {
                for (int v : row) res += v + " ";
                res += "<br>";
            }

            res += "<br><b>Algorithm:</b> Backtracking" +
                    "<br><b>Time Complexity:</b> O(N!)";

            return res;
        } catch (Exception e) {
            return "<h3>Error: Invalid Input</h3>";
        }
    }

    static boolean solve(int[][] b, int col, int n) {
        if (col == n) return true;

        for (int i = 0; i < n; i++) {
            if (safe(b, i, col, n)) {
                b[i][col] = 1;
                if (solve(b, col + 1, n)) return true;
                b[i][col] = 0;
            }
        }
        return false;
    }

    static boolean safe(int[][] b, int r, int c, int n) {
        for (int i = 0; i < c; i++)
            if (b[r][i] == 1) return false;

        for (int i = r, j = c; i >= 0 && j >= 0; i--, j--)
            if (b[i][j] == 1) return false;

        for (int i = r, j = c; i < n && j >= 0; i++, j--)
            if (b[i][j] == 1) return false;

        return true;
    }

    // ===============================
    // DIJKSTRA (GREEDY)
    // ===============================
    static String dijkstra(String input) {
        try {
            String[] lines = input.trim().split("\\r?\\n");

            int n = Integer.parseInt(lines[0].trim());

            if (lines.length < n + 1)
                return "<h3>Error: Incomplete matrix</h3>";

            int[][] graph = new int[n][n];

            for (int i = 0; i < n; i++) {
                String[] row = lines[i + 1].trim().split("\\s+");
                if (row.length != n)
                    return "<h3>Error: Matrix size incorrect</h3>";
                for (int j = 0; j < n; j++) {
                    graph[i][j] = Integer.parseInt(row[j]);
                }
            }

            int[] dist = new int[n];
            boolean[] vis = new boolean[n];

            Arrays.fill(dist, Integer.MAX_VALUE);
            dist[0] = 0;

            for (int i = 0; i < n - 1; i++) {
                int u = -1, min = Integer.MAX_VALUE;
                for (int j = 0; j < n; j++) {
                    if (!vis[j] && dist[j] < min) {
                        min = dist[j];
                        u = j;
                    }
                }
                if (u == -1) break;
                vis[u] = true;
                for (int v = 0; v < n; v++) {
                    if (!vis[v] && graph[u][v] != 0 &&
                            dist[u] + graph[u][v] < dist[v]) {
                        dist[v] = dist[u] + graph[u][v];
                    }
                }
            }

            String res = "<h3>Dijkstra Result</h3>";
            res += "<b>Source:</b> 0<br><br>";
            res += "<table border='1' cellpadding='5'>";
            res += "<tr><th>Node</th><th>Distance</th></tr>";
            for (int i = 0; i < n; i++) {
                res += "<tr><td>" + i + "</td><td>" + dist[i] + "</td></tr>";
            }
            res += "</table>";
            return res;

        } catch (Exception e) {
            e.printStackTrace();
            return "<h3>Error: Invalid Input</h3>";
        }
    }

    // ===============================
    // KRUSKAL
    // ===============================
    static String kruskal(String input) {
        try {
            String[] lines = input.trim().split("\n");
            int n = Integer.parseInt(lines[0].trim());
            int e = Integer.parseInt(lines[1].trim());

            int[][] edges = new int[e][3];

            for (int i = 0; i < e; i++) {
                String[] p = lines[i + 2].trim().split("\\s+");
                edges[i][0] = Integer.parseInt(p[0]);
                edges[i][1] = Integer.parseInt(p[1]);
                edges[i][2] = Integer.parseInt(p[2]);
            }

            Arrays.sort(edges, (a, b) -> a[2] - b[2]);

            int[] parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;

            int cost = 0;
            String res = "<h3>Kruskal MST</h3>";

            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                int pu = find(parent, u), pv = find(parent, v);
                if (pu != pv) {
                    cost += w;
                    res += u + " - " + v + " : " + w + "<br>";
                    parent[pu] = pv;
                }
            }

            res += "<br>Total Cost: " + cost +
                   "<br><b>Algorithm:</b> Greedy" +
                   "<br><b>Time:</b> O(E log E)";
            return res;

        } catch (Exception e) {
            return "Error in Kruskal Input";
        }
    }

    static int find(int[] p, int x) {
        if (p[x] == x) return x;
        return p[x] = find(p, p[x]);
    }

    // ===============================
    // GRAPH COLORING
    // ===============================
    static String graphColor(String input) {
        try {
            String[] lines = input.trim().split("\n");
            int n = Integer.parseInt(lines[0].trim());

            int[][] graph = new int[n][n];

            for (int i = 0; i < n; i++) {
                String[] row = lines[i + 1].trim().split("\\s+");
                for (int j = 0; j < n; j++) {
                    graph[i][j] = Integer.parseInt(row[j]);
                }
            }

            int[] color = new int[n];

            if (colorUtil(graph, color, 0, n, 3)) {
                String res = "<h3>Graph Coloring</h3>";
                for (int i = 0; i < n; i++)
                    res += "Node " + i + " Color " + color[i] + "<br>";
                res += "<br><b>Algorithm:</b> Backtracking" +
                       "<br><b>Time:</b> O(N^N)";
                return res;
            }

            return "No Solution";

        } catch (Exception e) {
            return "Error in Graph Coloring Input";
        }
    }

    static boolean colorUtil(int[][] g, int[] c, int v, int n, int m) {
        if (v == n) return true;
        for (int i = 1; i <= m; i++) {
            if (isSafeColor(g, c, v, i, n)) {
                c[v] = i;
                if (colorUtil(g, c, v + 1, n, m)) return true;
                c[v] = 0;
            }
        }
        return false;
    }

    static boolean isSafeColor(int[][] g, int[] c, int v, int col, int n) {
        for (int i = 0; i < n; i++)
            if (g[v][i] == 1 && c[i] == col) return false;
        return true;
    }

    // ===============================
    // GREEDY COIN CHANGE
    // ===============================
    static String greedy(String input) {
        try {
            String[] p = input.trim().split("\n");
            int amount = Integer.parseInt(p[0].trim());
            String[] coinsStr = p[1].trim().split("\\s+");

            int[] coins = new int[coinsStr.length];
            for (int i = 0; i < coins.length; i++)
                coins[i] = Integer.parseInt(coinsStr[i]);

            Arrays.sort(coins);

            String res = "<h3>Greedy Coin Change</h3>";

            for (int i = coins.length - 1; i >= 0; i--) {
                while (amount >= coins[i]) {
                    res += coins[i] + " ";
                    amount -= coins[i];
                }
            }

            res += "<br><b>Algorithm:</b> Greedy" +
                   "<br><b>Time:</b> O(n log n)";
            return res;

        } catch (Exception e) {
            return "Error in Greedy Input";
        }
    }

    // ===============================
    // HASHING
    // ===============================
    static String hashing(String input) {
        try {
            String[] p = input.trim().split("\\s+");
            int size = 10;

            int[] table = new int[size];
            Arrays.fill(table, -1);

            for (String s : p) {
                int key = Integer.parseInt(s.trim());
                int idx = key % size;
                int attempts = 0;
                while (table[idx] != -1 && attempts < size) {
                    idx = (idx + 1) % size;
                    attempts++;
                }
                if (attempts < size) table[idx] = key;
            }

            String res = "<h3>Hash Table</h3>";
            for (int i = 0; i < size; i++)
                res += i + " -> " + table[i] + "<br>";

            res += "<br><b>Algorithm:</b> Hashing" +
                   "<br><b>Time:</b> O(1) avg";
            return res;

        } catch (Exception e) {
            return "Error in Hashing Input";
        }
    }
}