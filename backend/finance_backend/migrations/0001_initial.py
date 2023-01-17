# Generated by Django 4.1.5 on 2023-01-13 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='db1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pair', models.CharField(max_length=10)),
                ('entryPrice', models.FloatField()),
                ('exitPrice', models.FloatField()),
                ('quantity', models.FloatField()),
                ('position', models.CharField(max_length=10)),
                ('pnlusdt', models.FloatField()),
                ('pnlpercent', models.FloatField()),
                ('profit', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='db2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pair', models.CharField(max_length=10)),
                ('marketSymbol', models.CharField(max_length=10)),
                ('position', models.CharField(max_length=10)),
            ],
        ),
    ]