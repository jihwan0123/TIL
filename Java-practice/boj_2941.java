package com.company;

import java.util.Scanner;

public class boj_2941 {

    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        String str = in.nextLine();

        int cnt = 0;

        for (int i = 0; i < str.length(); i++) {

            char ch = str.charAt(i);

            if(ch == 'c') {
                if(i < str.length() - 1) {
                    if(str.charAt(i + 1) == '=' || str.charAt(i + 1) == '-') { // c=, c-
                        i++;
                    }
                }
            }

            else if(ch == 'd') { 
                if (i < str.length() - 2 && str.charAt(i + 1) == 'z' && str.charAt(i + 2) == '=') {// dz=
                    i += 2;
                } else if (i < str.length() - 1 && str.charAt(i + 1) == '-') { // d-
                    i++;
                }
            }

            else if(ch == 'l' || ch =='n') { //lj, nj
                if(i < str.length() - 1) {
                    if(str.charAt(i + 1) == 'j') {
                        i++;
                    }
                }
            }

            else if(ch == 's' || ch =='z') { //s=, z=
                if(i < str.length() - 1) {
                    if(str.charAt(i + 1) == '=') {
                        i++;
                    }
                }
            }

            cnt++;
        }

        System.out.println(cnt);
    }
}
