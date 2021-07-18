package com.company;

import java.util.Scanner;

public class boj_15649 {
    public static int[] arr;
    public static boolean[] visited;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n, m;
        n = sc.nextInt();
        m = sc.nextInt();

        arr = new int[m];
        visited = new boolean[n];
        dfs(n, m, 0);

    }

    private static void dfs(int n, int m, int level) {
        if (level == m) {
            for (int val : arr) {
                System.out.print(val + " ");
            }
            System.out.println();
            return;
        }


        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                arr[level] = i + 1;
                dfs(n, m, level + 1);
                visited[i] = false;
            }
        }
    }
}
