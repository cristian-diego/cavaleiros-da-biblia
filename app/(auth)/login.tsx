import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/userStore';
import Button from '@/components/ui/Button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name,
            avatar: profile.avatar_url,
            xp: profile.xp || 0,
            level: profile.level || 1,
            attributes: {
              faith: profile.faith || 1,
              boldness: profile.boldness || 1,
              wisdom: profile.wisdom || 1,
            },
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          });
        }
      }

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4240498/pexels-photo-4240498.jpeg?auto=compress&cs=tinysrgb&w=300',
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Guardiões da Verdade</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
        </View>

        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Mail size={20} color="#8B877D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#8B877D" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { paddingRight: 50 }]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#8B877D" />
              ) : (
                <Eye size={20} color="#8B877D" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Lembrar-me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
            fullWidth
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou continue com</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Registre-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E85',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#8F9779',
  },
  form: {
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#E11D48',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 44,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E0D7C2',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2C3E85',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#2C3E85',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#565B49',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#2C3E85',
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0D7C2',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#8B877D',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#565B49',
  },
  footerLink: {
    fontSize: 14,
    color: '#2C3E85',
    fontWeight: '600',
  },
});
